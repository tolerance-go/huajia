@{%
const moo = require("moo");

// 使用 moo 库创建词法分析器
const lexer = moo.compile({
  ws:     /[ \t]+/, // 匹配空白字符（空格和制表符）
  string: /"(?:\\["\\]|[^\n"\\])*"|'(?:\\['\\]|[^\n'\\])*'/, // 匹配字符串字面量，支持转义字符，包括单引号
  number: /[0-9]+(?:\.[0-9]+)?/, // 匹配数值，包括整数和小数
  boolean: /true|false/, // 匹配布尔值
  lbrace: '{', // 匹配左大括号
  rbrace: '}', // 匹配右大括号
  lbrack: '[', // 匹配左方括号
  rbrack: ']', // 匹配右方括号
  colon: ':', // 匹配冒号
  comma: ',', // 匹配逗号
  atconfig: /@[a-zA-Z]+/, // 匹配 @ 开头的英文词
  newline: { match: /\r\n|\n/, lineBreaks: true }, // 匹配换行符，并处理行中断
  comment: /\/\/.*?$/, // 匹配单行注释
  word: /[a-zA-Z]+/, // 匹配任意英文单词
});
%}

# 指定使用上面定义的 lexer
@lexer lexer

Root -> _ "Root" _ Children _ {% 
  (data) => {
    return {
      type: "Root",
      name: data[1].value,
      children: data[3]
    };
  } 
%}

Children -> ("{" _ Element:* "}"):? {% 
  (data) => {
    return data[0] ? data[0][2] : []
  } 
%}

Element -> %word Values Settings _ Children _ {% 
  (data) => {
    return {
      type: "Element",
      name: data[0].value,
      children: data[4],
      values: data[1],
      settings: data[2]
    };
  } 
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

SettingName -> %atconfig {% (data) => data[0].value %}

Attrs -> "{" _ Attr:* "}" {% (data) => Object.fromEntries(data[2]) %}

Attr -> %word _ ":" _ %string _ {% 
  (data) => [data[0].value, data[4].value]
%}

# 这里有个 bug，如果直接在 Value 序列化，Values 中的 Value 只处理了最后一个项
# 修改后的 Value 支持递归数组
Value -> ArrayValue | String | Number | Boolean

String -> %string {% (data) => data[0].value.slice(1, -1) %}  # 去掉引号
Number -> %number {% (data) => parseFloat(data[0].value) %}   # 转换为数字
Boolean -> %boolean {% (data) => data[0].value === "true" %}  # 转换为布尔值

ArrayValue -> "[" _ (Value (_ "," _ Value):*):? _ "]" {% 
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

_ -> (%ws | %newline):* {% 
  () => null 
%} # 匹配空白字符或换行符
