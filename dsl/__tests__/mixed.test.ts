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
  "children": {
    "end": {
      "col": 2,
      "line": 3,
      "lineBreaks": 0,
      "offset": 45,
    },
    "nodes": [
      {
        "children": {
          "end": null,
          "nodes": [],
          "start": null,
        },
        "end": {
          "col": 37,
          "line": 2,
          "lineBreaks": 1,
          "offset": 43,
        },
        "id": null,
        "name": "Element",
        "scopes": [
          "scopeA",
          "scopeB",
        ],
        "settings": [],
        "slots": [
          "slotA",
          "slotB",
        ],
        "start": {
          "col": 4,
          "line": 2,
          "lineBreaks": 0,
          "offset": 10,
        },
        "values": [],
      },
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
    "offset": 45,
  },
  "id": null,
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
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
