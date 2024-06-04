import * as assert from "assert";
import * as vscode from "vscode";
import { DSLFormatter } from "../dslFormatter";

suite("DSL Formatter Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

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

    const dslFormatter = new DSLFormatter();

    cases.forEach(([_, initialText, expectedFormattedText]) => {
      const formattedText = dslFormatter.formatText(initialText);

      assert.strictEqual(formattedText, expectedFormattedText);
    });
  });
});
