import nearley from "nearley";
import grammar from "../lib/dsl.js";

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
      "type": "Element",
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
  "type": "Root",
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
      "type": "Element",
      "values": [
        [],
        "value2",
        100,
        true,
      ],
    },
  ],
  "name": "Root",
  "type": "Root",
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
      "type": "Element",
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
  "type": "Root",
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
      "type": "Element",
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
  "type": "Root",
}
`);
  });
});
