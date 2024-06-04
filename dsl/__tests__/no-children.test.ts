import nearley from "nearley";
import grammar from "../lib/dsl.js";

describe("省略 children", () => {
  it("Root 禁止省略 {}", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {}`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": [],
  "name": "Root",
  "type": "Root",
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
      "settings": [],
      "type": "Element",
      "values": [
        "value1",
      ],
    },
  ],
  "name": "Root",
  "type": "Root",
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
      "settings": [],
      "type": "Element",
      "values": [
        "value1",
        true,
        100,
      ],
    },
  ],
  "name": "Root",
  "type": "Root",
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
      "settings": [
        [
          "@css",
          {
            "color": "'red'",
          },
        ],
      ],
      "type": "Element",
      "values": [],
    },
  ],
  "name": "Root",
  "type": "Root",
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
      "settings": [
        [
          "@css",
          {
            "color": "'red'",
          },
        ],
        [
          "@config",
          {
            "color": "'red'",
          },
        ],
      ],
      "type": "Element",
      "values": [],
    },
  ],
  "name": "Root",
  "type": "Root",
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
      "settings": [
        [
          "@css",
          {
            "color": "'red'",
          },
        ],
        [
          "@config",
          {
            "color": "'red'",
          },
        ],
      ],
      "type": "Element",
      "values": [
        100,
        "value1",
        true,
      ],
    },
  ],
  "name": "Root",
  "type": "Root",
}
`);
  });
});
