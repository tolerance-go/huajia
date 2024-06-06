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
  "children": [
    {
      "children": [],
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
      "values": [
        "value1",
        "value2",
        100,
        true,
      ],
    },
  ],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
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
      "scopes": [],
      "settings": [],
      "slots": [],
      "values": [
        "value1",
        "value2",
        100,
        true,
      ],
    },
  ],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
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
      "values": [],
    },
  ],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
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
              "scopes": [],
              "settings": [],
              "slots": [],
              "values": [],
            },
          ],
          "name": "Element",
          "scopes": [],
          "settings": [],
          "slots": [],
          "values": [],
        },
        {
          "children": [],
          "name": "Element",
          "scopes": [],
          "settings": [],
          "slots": [],
          "values": [],
        },
      ],
      "name": "Element",
      "scopes": [],
      "settings": [],
      "slots": [],
      "values": [],
    },
  ],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
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
  "scopes": [],
  "settings": [],
  "slots": [],
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
  "children": [],
  "name": "Button",
  "scopes": [],
  "settings": [],
  "slots": [],
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
  "children": [],
  "name": "Button",
  "scopes": [],
  "settings": [],
  "slots": [],
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