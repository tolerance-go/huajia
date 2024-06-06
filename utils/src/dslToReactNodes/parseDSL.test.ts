import { parseDSL } from "./parseDSL";

describe("parseDSL", () => {
  it("should throw an error when parsing an invalid DSL string", () => {
    const invalidDSL = "invalid dsl string";

    expect(() => parseDSL(invalidDSL)).toThrow();
  });

  it("空字符", () => {
    const invalidDSL = "";

    expect(parseDSL(invalidDSL)).toMatchInlineSnapshot(`undefined`);
  });
});
