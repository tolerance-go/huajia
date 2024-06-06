import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("scopes", () => {
  it("单个域", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.scopeA
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
        "name": "Element",
        "scopes": [
          "scopeA",
        ],
        "settings": [],
        "slots": [],
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
    "offset": 26,
  },
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

  it("多个域", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.scopeA.scopeB
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
        "name": "Element",
        "scopes": [
          "scopeA",
          "scopeB",
        ],
        "settings": [],
        "slots": [],
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
    "offset": 33,
  },
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

  it("域和 values", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.scopeA.scopeB 100 true 'string'
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
        "name": "Element",
        "scopes": [
          "scopeA",
          "scopeB",
        ],
        "settings": [],
        "slots": [],
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

  it("域和 settings", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.scopeA.scopeB @css {
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
        "name": "Element",
        "scopes": [
          "scopeA",
          "scopeB",
        ],
        "settings": [
          [
            "@css",
            {
              "color": "red",
            },
          ],
        ],
        "slots": [],
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
    "line": 5,
    "lineBreaks": 0,
    "offset": 63,
  },
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
