import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("混合测试", () => {
  it("混合域和插槽", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.scopeA.scopeB:slotA:slotB
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": [
    {
      "children": [],
      "name": "Element",
      "scopes": [
        "slotA",
        "slotB",
      ],
      "settings": [],
      "slots": [
        "scopeA",
        "scopeB",
      ],
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
});
