import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("省略 children", () => {
  it("Root 禁止省略 {}", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {}`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": [],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "slots": [],
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
  "children": [
    {
      "children": [],
      "name": "Element",
      "scopes": [],
      "settings": [],
      "slots": [],
      "values": [
        "value1",
      ],
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

  it("Element 只有多个 values", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Element 'value1' true 100
    }`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": [
    {
      "children": [],
      "name": "Element",
      "scopes": [],
      "settings": [],
      "slots": [],
      "values": [
        "value1",
        true,
        100,
      ],
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
  "children": [
    {
      "children": [],
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
  "children": [
    {
      "children": [],
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
  "children": [
    {
      "children": [],
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
      "values": [
        100,
        "value1",
        true,
      ],
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
