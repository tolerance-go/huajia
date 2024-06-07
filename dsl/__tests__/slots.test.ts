import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("slots", () => {
  it("单个插槽", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   slotA: Element
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
      "offset": 26,
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
            "col": 18,
            "line": 2,
            "lineBreaks": 1,
            "offset": 24,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
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
    "offset": 26,
  },
  "id": null,
  "modifiers": [],
  "name": "Root",
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

  it("多个插槽", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   slotA: Element
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
      "offset": 26,
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
            "col": 18,
            "line": 2,
            "lineBreaks": 1,
            "offset": 24,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
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
    "offset": 26,
  },
  "id": null,
  "modifiers": [],
  "name": "Root",
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
