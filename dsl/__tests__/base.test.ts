import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("基础测试", () => {
  it("同时存在 values 和 settings", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element "value1" 'value2' 100 true @config {
     attr: "attr"
     other: 'other'
   } @css { color: 'red' } {} 
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 6,
      "lineBreaks": 0,
      "offset": 125,
    },
    "nodes": [
      {
        "children": {
          "end": {
            "col": 29,
            "line": 5,
            "lineBreaks": 0,
            "offset": 121,
          },
          "nodes": [],
          "start": {
            "col": 28,
            "line": 5,
            "lineBreaks": 0,
            "offset": 120,
          },
        },
        "end": {
          "col": 29,
          "line": 5,
          "lineBreaks": 0,
          "offset": 121,
        },
        "name": "Element",
        "scopes": [],
        "settings": [
          [
            "@config",
            {
              "attr": "attr",
              "other": "other",
            },
          ],
          [
            "@css",
            {
              "color": "red",
            },
          ],
        ],
        "slots": [],
        "start": {
          "col": 4,
          "line": 2,
          "lineBreaks": 0,
          "offset": 10,
        },
        "values": [
          "value1",
          "value2",
          100,
          true,
        ],
      },
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 2,
    "line": 6,
    "lineBreaks": 0,
    "offset": 125,
  },
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("只有 values", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element "value1" 'value2' 100 true {} 
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 3,
      "lineBreaks": 0,
      "offset": 50,
    },
    "nodes": [
      {
        "children": {
          "end": {
            "col": 40,
            "line": 2,
            "lineBreaks": 0,
            "offset": 46,
          },
          "nodes": [],
          "start": {
            "col": 39,
            "line": 2,
            "lineBreaks": 0,
            "offset": 45,
          },
        },
        "end": {
          "col": 40,
          "line": 2,
          "lineBreaks": 0,
          "offset": 46,
        },
        "name": "Element",
        "scopes": [],
        "settings": [],
        "slots": [],
        "start": {
          "col": 4,
          "line": 2,
          "lineBreaks": 0,
          "offset": 10,
        },
        "values": [
          "value1",
          "value2",
          100,
          true,
        ],
      },
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 2,
    "line": 3,
    "lineBreaks": 0,
    "offset": 50,
  },
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("只有 settings", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element @config {
    attr: "attr"
    other: 'other'
  } @css { color: 'red' } {} 
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 6,
      "lineBreaks": 0,
      "offset": 95,
    },
    "nodes": [
      {
        "children": {
          "end": {
            "col": 28,
            "line": 5,
            "lineBreaks": 0,
            "offset": 91,
          },
          "nodes": [],
          "start": {
            "col": 27,
            "line": 5,
            "lineBreaks": 0,
            "offset": 90,
          },
        },
        "end": {
          "col": 28,
          "line": 5,
          "lineBreaks": 0,
          "offset": 91,
        },
        "name": "Element",
        "scopes": [],
        "settings": [
          [
            "@config",
            {
              "attr": "attr",
              "other": "other",
            },
          ],
          [
            "@css",
            {
              "color": "red",
            },
          ],
        ],
        "slots": [],
        "start": {
          "col": 4,
          "line": 2,
          "lineBreaks": 0,
          "offset": 10,
        },
        "values": [],
      },
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 2,
    "line": 6,
    "lineBreaks": 0,
    "offset": 95,
  },
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("嵌套元素", () => {
    // 创建一个解析器实例
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // 要测试的 DSL 输入
    const input = `Root {
      Element {
        Element {
          Element {} 
        }
        Element {} 
      } 
    }
   `;

    // 解析输入
    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 5,
      "line": 8,
      "lineBreaks": 0,
      "offset": 106,
    },
    "nodes": [
      {
        "children": {
          "end": {
            "col": 7,
            "line": 7,
            "lineBreaks": 0,
            "offset": 99,
          },
          "nodes": [
            {
              "children": {
                "end": {
                  "col": 9,
                  "line": 5,
                  "lineBreaks": 0,
                  "offset": 71,
                },
                "nodes": [
                  {
                    "children": {
                      "end": {
                        "col": 20,
                        "line": 4,
                        "lineBreaks": 0,
                        "offset": 60,
                      },
                      "nodes": [],
                      "start": {
                        "col": 19,
                        "line": 4,
                        "lineBreaks": 0,
                        "offset": 59,
                      },
                    },
                    "end": {
                      "col": 20,
                      "line": 4,
                      "lineBreaks": 0,
                      "offset": 60,
                    },
                    "name": "Element",
                    "scopes": [],
                    "settings": [],
                    "slots": [],
                    "start": {
                      "col": 11,
                      "line": 4,
                      "lineBreaks": 0,
                      "offset": 51,
                    },
                    "values": [],
                  },
                ],
                "start": {
                  "col": 17,
                  "line": 3,
                  "lineBreaks": 0,
                  "offset": 39,
                },
              },
              "end": {
                "col": 9,
                "line": 5,
                "lineBreaks": 0,
                "offset": 71,
              },
              "name": "Element",
              "scopes": [],
              "settings": [],
              "slots": [],
              "start": {
                "col": 9,
                "line": 3,
                "lineBreaks": 0,
                "offset": 31,
              },
              "values": [],
            },
            {
              "children": {
                "end": {
                  "col": 18,
                  "line": 6,
                  "lineBreaks": 0,
                  "offset": 90,
                },
                "nodes": [],
                "start": {
                  "col": 17,
                  "line": 6,
                  "lineBreaks": 0,
                  "offset": 89,
                },
              },
              "end": {
                "col": 18,
                "line": 6,
                "lineBreaks": 0,
                "offset": 90,
              },
              "name": "Element",
              "scopes": [],
              "settings": [],
              "slots": [],
              "start": {
                "col": 9,
                "line": 6,
                "lineBreaks": 0,
                "offset": 81,
              },
              "values": [],
            },
          ],
          "start": {
            "col": 15,
            "line": 2,
            "lineBreaks": 0,
            "offset": 21,
          },
        },
        "end": {
          "col": 7,
          "line": 7,
          "lineBreaks": 0,
          "offset": 99,
        },
        "name": "Element",
        "scopes": [],
        "settings": [],
        "slots": [],
        "start": {
          "col": 7,
          "line": 2,
          "lineBreaks": 0,
          "offset": 13,
        },
        "values": [],
      },
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 5,
    "line": 8,
    "lineBreaks": 0,
    "offset": 106,
  },
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("测试换行\\r\\n", () => {
    // 创建一个解析器实例
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // 要测试的 DSL 输入
    const input = `Root {\r\n}\r\n`;

    // 解析输入
    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 1,
      "line": 2,
      "lineBreaks": 0,
      "offset": 8,
    },
    "nodes": [],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 1,
    "line": 2,
    "lineBreaks": 0,
    "offset": 8,
  },
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("根组件截断测试", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Button `;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": null,
    "nodes": [],
    "start": null,
  },
  "end": {
    "col": 7,
    "line": 1,
    "lineBreaks": 0,
    "offset": 6,
  },
  "name": "Button",
  "scopes": [],
  "settings": [],
  "slots": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("根组件截断测试-换行", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Button\n`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": null,
    "nodes": [],
    "start": null,
  },
  "end": {
    "col": 7,
    "line": 1,
    "lineBreaks": 1,
    "offset": 6,
  },
  "name": "Button",
  "scopes": [],
  "settings": [],
  "slots": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("根组件截断测试-结尾必须存在空格或者换行", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Button`;

    parser.feed(input);
    expect(parser.results[0]).toBe(undefined);
  });
});
