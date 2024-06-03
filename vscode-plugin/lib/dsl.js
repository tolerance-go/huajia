// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Root", "symbols": ["_", "ElementList", "_"], "postprocess": 
        (elements) => ({ type: 'Root', elements }) // 返回页面对象，包含所有元素
        },
    {"name": "ElementList$ebnf$1", "symbols": []},
    {"name": "ElementList$ebnf$1$subexpression$1", "symbols": ["Element", "_"]},
    {"name": "ElementList$ebnf$1", "symbols": ["ElementList$ebnf$1", "ElementList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ElementList", "symbols": ["ElementList$ebnf$1"], "postprocess": 
        (elements) => elements.filter(e => e[0]) // 返回元素数组
        },
    {"name": "Element$ebnf$1", "symbols": ["ElementValues"], "postprocess": id},
    {"name": "Element$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Element$ebnf$2", "symbols": ["ElementAttributes"], "postprocess": id},
    {"name": "Element$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Element", "symbols": ["word", "_", "Element$ebnf$1", "_", "Element$ebnf$2"], "postprocess": 
        ([name, , values, , attributes]) => ({ type: name, values: values || [], attributes: attributes || {} }) // 返回元素对象，包含名称、值和属性
        },
    {"name": "ElementValues$ebnf$1", "symbols": ["Value"]},
    {"name": "ElementValues$ebnf$1", "symbols": ["ElementValues$ebnf$1", "Value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ElementValues", "symbols": ["ElementValues$ebnf$1"], "postprocess": 
        (values) => values // 返回值数组
        },
    {"name": "Value", "symbols": ["string"]},
    {"name": "Value", "symbols": ["number"]},
    {"name": "Value", "symbols": ["boolean"]},
    {"name": "Value", "symbols": ["ArrayValue"]},
    {"name": "ArrayValue", "symbols": [{"literal":"["}, "_", "ArrayValues", "_", {"literal":"]"}], "postprocess": 
        ([, , values]) => values // 返回数组值
        },
    {"name": "ArrayValues$ebnf$1", "symbols": []},
    {"name": "ArrayValues$ebnf$1$subexpression$1", "symbols": ["_", "comma", "_", "Value"]},
    {"name": "ArrayValues$ebnf$1", "symbols": ["ArrayValues$ebnf$1", "ArrayValues$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ArrayValues", "symbols": ["Value", "ArrayValues$ebnf$1"], "postprocess": 
        (values) => [values[0], ...values[1].map(v => v[3])] // 返回数组值
        },
    {"name": "ElementAttributes", "symbols": [{"literal":"{"}, "_", "AttributeList", "_", {"literal":"}"}], "postprocess": 
        ([, , attributes]) => attributes // 返回属性对象
        },
    {"name": "AttributeList$ebnf$1", "symbols": []},
    {"name": "AttributeList$ebnf$1$subexpression$1", "symbols": ["_", "comma", "_", "Attribute"]},
    {"name": "AttributeList$ebnf$1", "symbols": ["AttributeList$ebnf$1", "AttributeList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "AttributeList", "symbols": ["Attribute", "AttributeList$ebnf$1"], "postprocess": 
        (attributes) => Object.assign({}, ...[attributes[0], ...attributes[1].map(v => v[3])]) // 返回属性对象
        },
    {"name": "Attribute", "symbols": ["word", "_", {"literal":":"}, "_", "Value"], "postprocess": 
        ([name, , , , value]) => ({ [name]: value }) // 返回属性键值对
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": 
        () => null
        },
    {"name": "WS", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "word", "symbols": [(lexer.has("word") ? {type: "word"} : word)]},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "boolean", "symbols": [(lexer.has("boolean") ? {type: "boolean"} : boolean)]},
    {"name": "comma", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma)]}
]
  , ParserStart: "Root"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
