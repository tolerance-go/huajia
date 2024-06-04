import * as assert from "assert";
import nearley from "nearley";
import grammar from "../../lib/dsl.js";

suite("DSL Formatter Test Suite", () => {
  test("dsl ne", async () => {
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
    assert.equal(parser.results[0], {
      type: "Root",
      name: "Root",
      children: [
        {
          type: "Element",
          name: "Element",
          children: [],
          values: ['"value1"', "'value2'", "100", "true"],
          settings: [
            [
              "@config",
              {
                attr: '"attr"',
                other: "'other'",
              },
            ],
          ],
        },
        {
          type: "Element",
          name: "Element",
          children: [
            {
              type: "Element",
              name: "Element",
              children: [],
              values: ['"value2"'],
              settings: [],
            },
          ],
          values: [],
          settings: [["@config", {}]],
        },
      ],
    });
    assert.strictEqual(parser.results.length, 3);
  });
});
