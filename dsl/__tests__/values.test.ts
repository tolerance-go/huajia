import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("基础测试", () => {
  it("values 支持数组", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element ["value1", "value2", 100, true, false] 'value2' 100 true
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
      "offset": 76,
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
            "col": 68,
            "line": 2,
            "lineBreaks": 1,
            "offset": 74,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [
            [
              "value1",
              "value2",
              100,
              true,
              false,
            ],
            "value2",
            100,
            true,
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
    "offset": 76,
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

  it("values 数组为空", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element [] 'value2' 100 true
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
      "offset": 40,
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
            "col": 32,
            "line": 2,
            "lineBreaks": 1,
            "offset": 38,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [
            [],
            "value2",
            100,
            true,
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
    "offset": 40,
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

  it("单个 value", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element [100] 'value2' 100 true
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
      "offset": 43,
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
            "col": 35,
            "line": 2,
            "lineBreaks": 1,
            "offset": 41,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [
            [
              100,
            ],
            "value2",
            100,
            true,
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
    "offset": 43,
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

  it("不同类型", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element [100, true, 'string'] 'value2' 100 true
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
      "offset": 59,
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
            "col": 51,
            "line": 2,
            "lineBreaks": 1,
            "offset": 57,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [
            [
              100,
              true,
              "string",
            ],
            "value2",
            100,
            true,
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
    "offset": 59,
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

  it("嵌套类型", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element [100, true, 'string', [100, true, 'string']] 'value2' 100 true
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
      "offset": 82,
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
            "col": 74,
            "line": 2,
            "lineBreaks": 1,
            "offset": 80,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "settings": [],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [
            [
              100,
              true,
              "string",
              [
                100,
                true,
                "string",
              ],
            ],
            "value2",
            100,
            true,
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
    "offset": 82,
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

  it("如果没有设置 value，则 value 为空", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element
 }
`;

    parser.feed(input);
    expect(parser.results[0].children.nodes[0][1].values).toEqual([]);
  });

  it("如果有设置 value，则 value 不为空", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element 100
 }
`;

    parser.feed(input);
    expect(parser.results[0].children.nodes[0][1].values.length).toBe(1);
  });
});
