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
      console.error("Error: Ambiguous grammar detected!");
    } else if (parser.results.length === 0) {
      console.error("Error: No parse results!");
    } else {
      console.log(JSON.stringify(parser.results[0], null, 2));
    }
  });
});
