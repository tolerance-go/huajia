import * as assert from "assert";
import nearley from "nearley";
import grammar from "../../lib/dsl.js";

suite("DSL Formatter Test Suite", () => {
  test("dsl ne", async () => {
    // 创建一个解析器实例
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // 要测试的 DSL 输入
    const input = `Root { 
    Element "value1" 100 true @config {
      attr: "attr"
    } {} 
    Element @config {} {
      Element "value2"{}
    }
  }
`;

    // 解析输入
    parser.feed(input);
    console.log(JSON.stringify(parser.results[0], null, 2));
    console.log(parser.results.length + '');
  });
});
