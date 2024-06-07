import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("位置测试", () => {
  it("node 没有子节点花括号的时候的开始和结束", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root `;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": null,
    "nodes": [],
    "start": null,
  },
  "end": {
    "col": 5,
    "line": 1,
    "lineBreaks": 0,
    "offset": 4,
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

  it("node 没有子节点花括号以换行符中断的时候的开始和结束", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root\n`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": null,
    "nodes": [],
    "start": null,
  },
  "end": {
    "col": 5,
    "line": 1,
    "lineBreaks": 1,
    "offset": 4,
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

  it("node 没有子节点花括号以回车+换行符中断的时候的开始和结束", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root\r\n`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": null,
    "nodes": [],
    "start": null,
  },
  "end": {
    "col": 5,
    "line": 1,
    "lineBreaks": 1,
    "offset": 4,
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

  it("node 有子节点花括号", () => {
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

  it("node 有子节点花括号", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
    
    default: Element

    }`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 5,
      "line": 5,
      "lineBreaks": 0,
      "offset": 38,
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
            "line": 3,
            "lineBreaks": 2,
            "offset": 32,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "scopes": [],
          "settings": [],
          "start": {
            "col": 14,
            "line": 3,
            "lineBreaks": 0,
            "offset": 25,
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
    "col": 5,
    "line": 5,
    "lineBreaks": 0,
    "offset": 38,
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
