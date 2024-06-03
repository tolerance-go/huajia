@{%
const moo = require("moo");

let lexer = moo.compile({
    WS:      /[ \t]+/, // 匹配空白字符
    comment: /\/\/.*?$/, // 匹配注释
    lbrace:  '{', // 匹配左花括号
    rbrace:  '}', // 匹配右花括号
    lbrack:  '[', // 匹配左方括号
    rbrack:  ']', // 匹配右方括号
    comma:   ',', // 匹配逗号
    colon:   ':', // 匹配冒号
    string:  /"(?:\\["\\]|[^\n"\\])*"/, // 匹配字符串
    number:  /-?(?:[0-9]|[1-9][0-9]*)(?:\.[0-9]+)?/, // 匹配数字
    boolean: /true|false/, // 匹配布尔值
    word:    /[a-zA-Z0-9_]+/, // 匹配单词
    newline: { match: /\n/, lineBreaks: true }, // 匹配换行符
});

%}

@lexer lexer

# 入口规则，表示整个页面
Root -> _ ElementList _ {%
    (elements) => ({ type: 'Root', elements }) // 返回页面对象，包含所有元素
%}

# 元素列表，包含零个或多个元素
ElementList -> (Element _):* {%
    (elements) => elements.filter(e => e[0]) // 返回元素数组
%}

# 元素规则，匹配元素名称及其属性
Element -> word _ ElementValues:? _ ElementAttributes:? {%
    ([name, , values, , attributes]) => ({ type: name, values: values || [], attributes: attributes || {} }) // 返回元素对象，包含名称、值和属性
%}

# 元素值列表，包含一个或多个值
ElementValues -> Value:+ {%
    (values) => values // 返回值数组
%}

# 值规则，匹配字符串、数字、布尔值或数组
Value -> string | number | boolean | ArrayValue

# 数组值规则，匹配数组
ArrayValue -> "[" _ ArrayValues _ "]" {%
    ([, , values]) => values // 返回数组值
%}

# 数组值列表，包含零个或多个值
ArrayValues -> Value (_ comma _ Value ):* {%
    (values) => [values[0], ...values[1].map(v => v[3])] // 返回数组值
%}

# 元素属性列表，包含零个或多个属性
ElementAttributes -> "{" _ AttributeList _ "}" {%
    ([, , attributes]) => attributes // 返回属性对象
%}

# 属性列表，包含零个或多个属性
AttributeList -> Attribute (_ comma _ Attribute ):* {%
    (attributes) => Object.assign({}, ...[attributes[0], ...attributes[1].map(v => v[3])]) // 返回属性对象
%}

# 属性规则，匹配属性名称及其值
Attribute -> word _ ":" _ Value {%
    ([name, , , , value]) => ({ [name]: value }) // 返回属性键值对
%}

# 匹配空白字符
_ -> WS:* {%
    () => null
%}

WS -> %WS
word -> %word
string -> %string
number -> %number
boolean -> %boolean
comma -> %comma
