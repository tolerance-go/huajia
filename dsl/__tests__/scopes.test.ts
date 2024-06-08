import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("scopes", () => {
  it("单个域", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   scopeA.Element
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
        "default",
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
          "scopes": [
            {
              "end": {
                "col": 10,
                "line": 2,
                "lineBreaks": 0,
                "offset": 16,
              },
              "scope": "scopeA",
              "start": {
                "col": 4,
                "line": 2,
                "lineBreaks": 0,
                "offset": 10,
              },
            },
          ],
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
    "offset": 26,
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
   scopeA.scopeB.Element
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
      "offset": 33,
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
            "col": 25,
            "line": 2,
            "lineBreaks": 1,
            "offset": 31,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "scopes": [
            {
              "end": {
                "col": 10,
                "line": 2,
                "lineBreaks": 0,
                "offset": 16,
              },
              "scope": "scopeA",
              "start": {
                "col": 4,
                "line": 2,
                "lineBreaks": 0,
                "offset": 10,
              },
            },
            {
              "end": {
                "col": 17,
                "line": 2,
                "lineBreaks": 0,
                "offset": 23,
              },
              "scope": "scopeB",
              "start": {
                "col": 11,
                "line": 2,
                "lineBreaks": 0,
                "offset": 17,
              },
            },
          ],
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
    "offset": 33,
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
   scopeA.scopeB.Element 100 true 'string'
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
      "offset": 51,
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
            "col": 43,
            "line": 2,
            "lineBreaks": 1,
            "offset": 49,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "scopes": [
            {
              "end": {
                "col": 10,
                "line": 2,
                "lineBreaks": 0,
                "offset": 16,
              },
              "scope": "scopeA",
              "start": {
                "col": 4,
                "line": 2,
                "lineBreaks": 0,
                "offset": 10,
              },
            },
            {
              "end": {
                "col": 17,
                "line": 2,
                "lineBreaks": 0,
                "offset": 23,
              },
              "scope": "scopeB",
              "start": {
                "col": 11,
                "line": 2,
                "lineBreaks": 0,
                "offset": 17,
              },
            },
          ],
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
    "offset": 51,
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
   scopeA.scopeB.Element @css {
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
      "offset": 63,
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
            "offset": 61,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "scopes": [
            {
              "end": {
                "col": 10,
                "line": 2,
                "lineBreaks": 0,
                "offset": 16,
              },
              "scope": "scopeA",
              "start": {
                "col": 4,
                "line": 2,
                "lineBreaks": 0,
                "offset": 10,
              },
            },
            {
              "end": {
                "col": 17,
                "line": 2,
                "lineBreaks": 0,
                "offset": 23,
              },
              "scope": "scopeB",
              "start": {
                "col": 11,
                "line": 2,
                "lineBreaks": 0,
                "offset": 17,
              },
            },
          ],
          "settings": [
            [
              "css",
              [
                [
                  "color",
                  [],
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
    "offset": 63,
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
