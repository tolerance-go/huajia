import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("slots", () => {
  it("单个插槽", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element:slotA
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
      ],
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

  it("多个插槽", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element:slotA:slotB
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
});
