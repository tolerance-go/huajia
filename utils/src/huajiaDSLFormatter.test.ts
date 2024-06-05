import { HuajiaDSLFormatter } from "./huajiaDSLFormatter";

describe("DSL Formatter Test Suite", () => {
  test("Format DSL code compactText", async () => {
    const cases = [
      ["空子集", `Root { }`, `Root {}\n`],
      [
        "values 的字符串",
        `Root {
  Element 'string'
}`,
        `Root {
  Element "string"
}\n`,
      ],
    ];

    const dslFormatter = new HuajiaDSLFormatter();

    cases.forEach(([_, initialText, expectedFormattedText]) => {
      const formattedText = dslFormatter.formatText(initialText);

      expect(formattedText).toBe(expectedFormattedText);
    });
  });
});
