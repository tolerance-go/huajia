import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("attrs", () => {
  it("值支持布尔，字符串和数值以及数组", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element @config {
     vertical: true
     string: 'string'
     number: 100
     array: [true, 'string', 100, [true, 'string', 100]]
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
      "settings": [
        [
          "@config",
          {
            "array": [
              true,
              "string",
              100,
              [
                true,
                "string",
                100,
              ],
            ],
            "number": 100,
            "string": "string",
            "vertical": true,
          },
        ],
      ],
      "values": [],
    },
  ],
  "name": "Root",
  "settings": [],
  "values": [],
}
`);
  });
});
