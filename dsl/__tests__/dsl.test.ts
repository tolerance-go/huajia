import nearley from "nearley";
import grammar from "../lib/dsl.js";

describe("dsl test", () => {
  it("base", () => {
    // 创建一个解析器实例
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // 要测试的 DSL 输入
    const input = `Root {
   Element "value1" 'value2' 100 true @config {
     attr: "attr"
     other: 'other'
   } {} 
   Element @config {} {
     Element "value2"{}
   }
 }
`;

    // 解析输入
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
      ],
      "type": "Element",
      "values": [
        ""value1"",
        "'value2'",
        "100",
        "true",
      ],
    },
    {
      "children": [
        {
          "children": [],
          "name": "Element",
          "settings": [],
          "type": "Element",
          "values": [
            ""value2"",
          ],
        },
      ],
      "name": "Element",
      "settings": [
        [
          "@config",
          {},
        ],
      ],
      "type": "Element",
      "values": [],
    },
  ],
  "name": "Root",
  "type": "Root",
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
  "type": "Root",
}
`);
  });
});
