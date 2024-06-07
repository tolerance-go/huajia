import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("混合测试", () => {
  it("混合域和插槽", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   slotA: Element.scopeA.scopeB
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 3,
      "lineBreaks": 0,
      "offset": 40,
    },
    "nodes": [
      [
        "slotA",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 32,
            "line": 2,
            "lineBreaks": 1,
            "offset": 38,
          },
          "id": null,
          "modifiers": [
            "scopeA",
            "scopeB",
          ],
          "name": "Element",
          "scopes": [],
          "settings": [],
          "start": {
            "col": 11,
            "line": 2,
            "lineBreaks": 0,
            "offset": 17,
          },
          "values": [],
        },
      ],
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 2,
    "line": 3,
    "lineBreaks": 0,
    "offset": 40,
  },
  "id": null,
  "modifiers": [],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });
});
