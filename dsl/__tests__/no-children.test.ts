import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("省略 children", () => {
  it("Root 禁止省略 {}", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {}`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 7,
      "line": 1,
      "lineBreaks": 0,
      "offset": 6,
    },
    "nodes": [],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 7,
    "line": 1,
    "lineBreaks": 0,
    "offset": 6,
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

  it("Element 只有 values", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Element 'value1'
    }`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 5,
      "line": 3,
      "lineBreaks": 0,
      "offset": 36,
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
        "id": null,
        "name": "Element",
        "scopes": [],
        "settings": [],
        "slots": [],
        "start": {
          "col": 9,
          "line": 2,
          "lineBreaks": 0,
          "offset": 15,
        },
        "values": [
          "value1",
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
    "col": 5,
    "line": 3,
    "lineBreaks": 0,
    "offset": 36,
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

  it("Element 只有多个 values", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Element 'value1' true 100
    }`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 5,
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
          "col": 34,
          "line": 2,
          "lineBreaks": 1,
          "offset": 40,
        },
        "id": null,
        "name": "Element",
        "scopes": [],
        "settings": [],
        "slots": [],
        "start": {
          "col": 9,
          "line": 2,
          "lineBreaks": 0,
          "offset": 15,
        },
        "values": [
          "value1",
          true,
          100,
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
    "col": 5,
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

  it("Element 只有 settings", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Element @css {
            color: 'red'
        }
    }`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 5,
      "line": 5,
      "lineBreaks": 0,
      "offset": 69,
    },
    "nodes": [
      {
        "children": {
          "end": null,
          "nodes": [],
          "start": null,
        },
        "end": {
          "col": 10,
          "line": 4,
          "lineBreaks": 1,
          "offset": 64,
        },
        "id": null,
        "name": "Element",
        "scopes": [],
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
          "col": 9,
          "line": 2,
          "lineBreaks": 0,
          "offset": 15,
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
    "col": 5,
    "line": 5,
    "lineBreaks": 0,
    "offset": 69,
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

  it("Element 只有多个 settings", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Element @css {
            color: 'red'
        } @config {
            color: 'red'
        }
    }`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 5,
      "line": 7,
      "lineBreaks": 0,
      "offset": 114,
    },
    "nodes": [
      {
        "children": {
          "end": null,
          "nodes": [],
          "start": null,
        },
        "end": {
          "col": 10,
          "line": 6,
          "lineBreaks": 1,
          "offset": 109,
        },
        "id": null,
        "name": "Element",
        "scopes": [],
        "settings": [
          [
            "@css",
            {
              "color": "red",
            },
          ],
          [
            "@config",
            {
              "color": "red",
            },
          ],
        ],
        "slots": [],
        "start": {
          "col": 9,
          "line": 2,
          "lineBreaks": 0,
          "offset": 15,
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
    "col": 5,
    "line": 7,
    "lineBreaks": 0,
    "offset": 114,
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

  it("Element 同时有 values 和 settings", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Element 100 'value1' true @css {
            color: 'red'
        } @config {
            color: 'red'
        }
    }`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 5,
      "line": 7,
      "lineBreaks": 0,
      "offset": 132,
    },
    "nodes": [
      {
        "children": {
          "end": null,
          "nodes": [],
          "start": null,
        },
        "end": {
          "col": 10,
          "line": 6,
          "lineBreaks": 1,
          "offset": 127,
        },
        "id": null,
        "name": "Element",
        "scopes": [],
        "settings": [
          [
            "@css",
            {
              "color": "red",
            },
          ],
          [
            "@config",
            {
              "color": "red",
            },
          ],
        ],
        "slots": [],
        "start": {
          "col": 9,
          "line": 2,
          "lineBreaks": 0,
          "offset": 15,
        },
        "values": [
          100,
          "value1",
          true,
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
    "col": 5,
    "line": 7,
    "lineBreaks": 0,
    "offset": 132,
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
