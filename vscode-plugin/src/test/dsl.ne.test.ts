import * as assert from "assert";
import nearley from "nearley";
import grammar from "../../lib/dsl.js";

suite("DSL Formatter Test Suite", () => {
  test("dsl ne", async () => {
    // 创建一个解析器实例
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // 要测试的 DSL 输入
    const input = `Root {
  Title "Styled Page Example"
}
`;

    // 解析输入
    parser.feed(input);

    // 输出解析结果
    if (parser.results.length > 1) {
      assert.fail("Error: Ambiguous grammar detected!");
    } else if (parser.results.length === 0) {
      assert.fail("Error: No parse results!");
    } else {
      const result = parser.results[0];

      // 示例断言：检查解析结果的结构
      assert.strictEqual(result.type, "Root");
      assert.strictEqual(Array.isArray(result.elements), true);

      // 进一步的断言可以根据具体的解析结果进行
      // 例如，检查第一个元素的类型
      assert.strictEqual(result.elements[0].type, "Title");
      assert.strictEqual(result.elements[0].values[0], "Styled Page Example");

      console.log(JSON.stringify(result, null, 2));
    }
  });
});
