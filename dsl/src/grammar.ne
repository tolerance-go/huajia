@{%
const moo = require("moo");

// 使用 moo 库创建词法分析器
const lexer = moo.compile({
  whitespace: { match: /[ \t\r\n]+/, lineBreaks: true }, // 合并空白字符和换行符规则
  string: /"(?:\\["\\]|[^\n"\\])*"|'(?:\\['\\]|[^\n'\\])*'/, // 匹配字符串字面量，支持转义字符，包括单引号
  number: /[0-9]+(?:\.[0-9]+)?/, // 匹配数值，包括整数和小数
  boolean: /true|false/, // 匹配布尔值
  lbrace: '{', // 匹配左大括号
  rbrace: '}', // 匹配右大括号
  lbrack: '[', // 匹配左方括号
  rbrack: ']', // 匹配右方括号
  colon: ':', // 匹配冒号
  period: '.', // 匹配点号
  comma: ',', // 匹配逗号
  hash: '#', // 匹配井号
  at: '@',
  comment: /\/\/.*?$/, // 匹配单行注释
  identifier: /[a-z][a-zA-Z0-9_]*/, // 匹配以小写字母开头的单词
  typeId: /[A-Z][a-zA-Z0-9_]*/, // 匹配以大写字母开头的单词
  // 逻辑表达式
  if: 'IF',
  then: 'THEN',
  else: 'ELSE',
  not: 'NOT',
  and: 'AND',
  or: 'OR',
  lparen: '(',
  rparen: ')',
  equals: '==',
  notequals: '!=',
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<=',
});
%}

# 指定使用上面定义的 lexer
@lexer lexer
@{%
function withLocation(data) {
  return {
    col: data.col,
    line: data.line,
    lineBreaks: data.lineBreaks,
    offset: data.offset,  
  };
}
%}

Root -> _ Node _ {% 
  (data) => {
    return data[1];
  } 
%}

# 使用 (Children | %whitespace) 代替 :? 设置递归结束条件，减少匹配数量
Node -> Scopes %typeId Id:? Modifiers Values Settings _ (Children | %whitespace) {% 
  (data) => {
    const noChildrenBrace = /[ \t\r\n]+/.test(data[7][0].value);
    return {
      start: data[0].length ? data[0][0].start : withLocation(data[1]),
      scopes: data[0],
      name: data[1].value,
      id: data[2],
      modifiers: data[3],
      values: data[4],
      settings: data[5],
      // 没有子节点花括号的时候，children 开始和结束位置都是空
      children: noChildrenBrace ? {
        start: null,
        end: null,
        nodes: []
      } : data[7][0],
      // 如果没有子节点花括号，Node 的结尾就是空白符，否则用 children 的结束数据
      end: noChildrenBrace ? withLocation(data[7][0]) : data[7][0].end
    };
  } 
%}

Scopes -> Scope:* {% 
  (data) => {
    return data[0]
  } 
%}

Scope -> %identifier %period {% 
  (data) => {
    return {
      scope: data[0].value,
      start: withLocation(data[0]),
      end: withLocation(data[1])
    }
  } 
%}

Modifiers -> (%period %identifier):* {% 
  (data) => {
    const modifiers = [];
    for (let i = 0; i < data[0].length; i++) {
      modifiers.push(data[0][i][1].value);
    }
    return modifiers
  } 
%}

Children -> %lbrace _ NodeAttr:* %rbrace {% 
  (data) => {
    return {
      nodes: data[2],
      start: withLocation(data[0]),
      end: withLocation(data[3])
    }
  } 
%}

NodeAttr -> (%identifier _ %colon _):? Node _ {% 
  (data) => [data[0] ? data[0][0].value : 'default', data[1]]
%}

Values -> (_ Value):* {% 
  (data) => {
    const values = [];
    for (let i = 0; i < data[0].length; i++) {
      values.push(data[0][i][1][0]);
    }
    return values
  }
%}

Settings -> (_ SettingName _ Attrs):* {% 
  (data) => {
    const values = [];
    for (let i = 0; i < data[0].length; i++) {
      values.push([
        data[0][i][1],
        data[0][i][3].attrs
      ]);
    }
    return values
  } 
%}

SettingName -> %at %identifier {% (data) => data[1].value %}

Attrs -> %lbrace _ Attr:* %rbrace {% (data) => {
  return {
    type: 'Attrs',
    attrs: data[2],
  }
} %}

Attr -> %identifier AttrModifiers _ %colon _ (Value | Attrs | Result) _ {% 
  (data) => {
    return [
      data[0].value,
      data[1],
      typeof data[5][0] === 'object' && data[5][0].type === 'Attrs' 
        ? data[5][0].attrs
          : data[5][0][0]
    ]
  }
%}

AttrModifiers -> (%period %identifier):* {% 
  (data) => {
    const modifiers = [];
    for (let i = 0; i < data[0].length; i++) {
      modifiers.push(data[0][i][1].value);
    }
    return modifiers
  } 
%}

# ==================== 逻辑表达式开始 ====================

# 分支语句 ::= IF 条件 THEN 结果 ELSE 结果
BranchStatement -> "IF" _ ValueCondition _ "THEN" _ Result _ "ELSE" _ Result

# 结果
Result -> FunctionExpression
        | BranchStatement

# 条件 ::= 比较表达式 | 逻辑表达式 | 函数表达式
# 表达式用来计算或者表示值
ValueCondition -> ComparisonExpression
           | LogicalExpression
           | FunctionExpression
           | StateExpression
           | ValueExpression

# 比较表达式 ::= 变量 比较操作符 值
ComparisonExpression -> ValueCondition _ CompareOp _ ValueCondition

# 逻辑表达式 ::= 条件 逻辑操作符 条件 | NOT 条件 | ( 条件 )
LogicalExpression -> ValueCondition _ LogicalOp _ ValueCondition
                   | "NOT" _ ValueCondition
                   | "(" _ ValueCondition _ ")"

# 函数表达式 ::= 函数名(参数)
FunctionExpression -> FunctionName "(" _ Parameters:? _ ")"

# 变量 ::= 字符串
StateExpression -> SelectorPath

# 值表达式
ValueExpression -> Value

# 比较操作符
CompareOp -> "=="
           | "!="
           | ">"
           | "<"
           | ">="
           | "<="

# 逻辑操作符
LogicalOp -> "AND"
           | "OR"

# 函数名称
FunctionName -> SelectorPath

# 函数参数列表
Parameters -> Parameter ("," _ Parameter):*

# 函数参数
Parameter -> ValueCondition

SelectorPath -> (Id Selectors "."):? %identifier

Selectors -> Selector:*

Selector -> "." %identifier

# ==================== 逻辑表达式结束 ====================

# ==================== 公共部分开始 ====================

# 这里有个 bug，如果直接在 Value 序列化，Values 中的 Value 只处理了最后一个项
# 修改后的 Value 支持递归数组
Value -> ArrayValue | String | Number | Boolean

ArrayValue -> %lbrack _ (Value (_ %comma _ Value):*):? _ %rbrack {% 
  (data) => {
    const values = [];
    if (data[2]) {
      values.push(data[2][0][0]);
      for (let i = 0; i < data[2][1].length; i++) {
        values.push(data[2][1][i][3][0]);
      }
    }
    return values;
  }
%}

String -> %string {% (data) => data[0].value.slice(1, -1) %}  # 去掉引号
Number -> %number {% (data) => parseFloat(data[0].value) %}   # 转换为数字
Boolean -> %boolean {% (data) => data[0].value === "true" %}  # 转换为布尔值

Id -> %hash %identifier {% 
  (data) => data[1].value
%}

# 注意：这里是 0 次和多次，whitespace 自身的正则是 1 次和多次，所以是有正确的设置
# 匹配空白字符或换行符
_ -> %whitespace:* {% 
  () => null 
%}

# ==================== 公共部分结束 ====================
