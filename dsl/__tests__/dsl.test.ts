import nearley from "nearley";
import grammar from "../lib/grammar.js";

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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [
        [
          "@config",
          {
            "attr": ""attr"",
            "other": "'other'",
          },
        ],
        [
          "@css",
          {
            "color": "'red'",
          },
        ],
      ],
      "values": [
        "value1",
        "value2",
        100,
        true,
      ],
    },
  ],
  "name": "Root",
  "settings": [],
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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [],
      "values": [
        "value1",
        "value2",
        100,
        true,
      ],
    },
  ],
  "name": "Root",
  "settings": [],
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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [
        [
          "@config",
          {
            "attr": ""attr"",
            "other": "'other'",
          },
        ],
        [
          "@css",
          {
            "color": "'red'",
          },
        ],
      ],
      "values": [],
    },
  ],
  "name": "Root",
  "settings": [],
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
  "children": [
    {
      "children": [
        {
          "children": [
            {
              "children": [],
              "name": "Element",
              "settings": [],
              "values": [],
            },
          ],
          "name": "Element",
          "settings": [],
          "values": [],
        },
        {
          "children": [],
          "name": "Element",
          "settings": [],
          "values": [],
        },
      ],
      "name": "Element",
      "settings": [],
      "values": [],
    },
  ],
  "name": "Root",
  "settings": [],
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
  "children": [],
  "name": "Root",
  "settings": [],
  "values": [],
}
`);
  });
});
