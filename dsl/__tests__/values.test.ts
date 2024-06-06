import nearley from "nearley";
import grammar from "../lib/grammar.js";

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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [],
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
  "name": "Root",
  "settings": [],
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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [],
      "values": [
        [],
        "value2",
        100,
        true,
      ],
    },
  ],
  "name": "Root",
  "settings": [],
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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [],
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
  "name": "Root",
  "settings": [],
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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [],
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
  "name": "Root",
  "settings": [],
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
  "children": [
    {
      "children": [],
      "name": "Element",
      "settings": [],
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
  "name": "Root",
  "settings": [],
  "values": [],
}
`);
  });
});
