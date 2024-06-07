import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("modifiers", () => {
  it("单个域", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.modifierA
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
      "offset": 29,
    },
    "nodes": [
      [
        "default",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 21,
            "line": 2,
            "lineBreaks": 1,
            "offset": 27,
          },
          "id": null,
          "modifiers": [
            "modifierA",
          ],
          "name": "Element",
          "scopes": [],
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
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
    "offset": 29,
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

  it("多个域", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.modifierA.modifierB
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
      "offset": 39,
    },
    "nodes": [
      [
        "default",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 31,
            "line": 2,
            "lineBreaks": 1,
            "offset": 37,
          },
          "id": null,
          "modifiers": [
            "modifierA",
            "modifierB",
          ],
          "name": "Element",
          "scopes": [],
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
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
    "offset": 39,
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

  it("域和 values", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.modifierA.modifierB 100 true 'string'
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
      "offset": 57,
    },
    "nodes": [
      [
        "default",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 49,
            "line": 2,
            "lineBreaks": 1,
            "offset": 55,
          },
          "id": null,
          "modifiers": [
            "modifierA",
            "modifierB",
          ],
          "name": "Element",
          "scopes": [],
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [
            100,
            true,
            "string",
          ],
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
    "offset": 57,
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

  it("域和 settings", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.modifierA.modifierB @css {
     color: 'red'
   }
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 5,
      "lineBreaks": 0,
      "offset": 69,
    },
    "nodes": [
      [
        "default",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 5,
            "line": 4,
            "lineBreaks": 1,
            "offset": 67,
          },
          "id": null,
          "modifiers": [
            "modifierA",
            "modifierB",
          ],
          "name": "Element",
          "scopes": [],
          "settings": [
            [
              "@css",
              [
                [
                  "color",
                  "red",
                ],
              ],
            ],
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
    "line": 5,
    "lineBreaks": 0,
    "offset": 69,
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
