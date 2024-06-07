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
  settingName: /@[a-zA-Z]+/, // 匹配 @ 开头的英文词
  comment: /\/\/.*?$/, // 匹配单行注释
  word: /[a-z][a-zA-Z]*/, // 匹配以小写字母开头的单词
  nodeName: /[A-Z][a-zA-Z]*/, // 匹配以大写字母开头的单词
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
Node -> Scopes %nodeName Id Modifiers Values Settings _ (Children | %whitespace) {% 
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

Id -> (%hash %word):? {% 
  (data) => data[0] ? data[0][1].value : null 
%}

Scopes -> Scope:* {% 
  (data) => {
    return data[0]
  } 
%}

Scope -> %word %period {% 
  (data) => {
    return {
      scope: data[0].value,
      start: withLocation(data[0]),
      end: withLocation(data[1])
    }
  } 
%}

Modifiers -> (%period %word):* {% 
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

NodeAttr -> (%word _ %colon _):? Node _ {% 
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
        data[0][i][3]
      ]);
    }
    return values
  } 
%}

SettingName -> %settingName {% (data) => data[0].value %}

Attrs -> %lbrace _ Attr:* %rbrace {% (data) => data[2] %}

Attr -> %word _ %colon _ Value _ {% 
  (data) => [data[0].value, data[4][0]]
%}

# 这里有个 bug，如果直接在 Value 序列化，Values 中的 Value 只处理了最后一个项
# 修改后的 Value 支持递归数组
Value -> ArrayValue | String | Number | Boolean

String -> %string {% (data) => data[0].value.slice(1, -1) %}  # 去掉引号
Number -> %number {% (data) => parseFloat(data[0].value) %}   # 转换为数字
Boolean -> %boolean {% (data) => data[0].value === "true" %}  # 转换为布尔值

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

# 注意：这里是 0 次和多次，whitespace 自身的正则是 1 次和多次，所以是有正确的设置
_ -> %whitespace:* {% 
  () => null 
%} # 匹配空白字符或换行符
