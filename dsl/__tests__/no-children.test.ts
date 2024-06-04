import nearley from "nearley";
import grammar from "../lib/dsl.js";

describe("省略 children", () => {
  it("values 和 settings 同时存在", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element "value1" 'value2' 100 true @config {
     attr: "attr"
     other: 'other'
   } @css { color: 'red' }
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot();
  });
});
