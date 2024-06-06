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
  "children": [
    {
      "children": [],
      "name": "Element",
      "scopes": [],
      "settings": [],
      "slots": [
        "scopeA",
      ],
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

  it("多个域", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.scopeA.scopeB
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": [
    {
      "children": [],
      "name": "Element",
      "scopes": [],
      "settings": [],
      "slots": [
        "scopeA",
        "scopeB",
      ],
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

  it("域和 values", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element.scopeA.scopeB 100 true 'string'
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": [
    {
      "children": [],
      "name": "Element",
      "scopes": [],
      "settings": [],
      "slots": [
        "scopeA",
        "scopeB",
      ],
      "values": [
        100,
        true,
        "string",
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
      "slots": [
        "scopeA",
        "scopeB",
      ],
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
