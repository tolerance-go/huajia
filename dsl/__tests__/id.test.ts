import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("id 测试", () => {
  it("id 语法", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root#id {}`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 10,
      "line": 1,
      "lineBreaks": 0,
      "offset": 9,
    },
    "nodes": [],
    "start": {
      "col": 9,
      "line": 1,
      "lineBreaks": 0,
      "offset": 8,
    },
  },
  "end": {
    "col": 10,
    "line": 1,
    "lineBreaks": 0,
    "offset": 9,
  },
  "id": "id",
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

  it("id 和 scopes", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root#id.scope {}`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 16,
      "line": 1,
      "lineBreaks": 0,
      "offset": 15,
    },
    "nodes": [],
    "start": {
      "col": 15,
      "line": 1,
      "lineBreaks": 0,
      "offset": 14,
    },
  },
  "end": {
    "col": 16,
    "line": 1,
    "lineBreaks": 0,
    "offset": 15,
  },
  "id": "id",
  "name": "Root",
  "scopes": [
    "scope",
  ],
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
