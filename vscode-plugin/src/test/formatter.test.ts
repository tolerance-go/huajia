import * as assert from "assert";
import * as vscode from "vscode";
import { DSLFormatter } from "../dslFormatter";

suite("DSL Formatter Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Format DSL code compactText", async () => {
    const cases = [[`Root { }`, `Root {}\n`]];

    const dslFormatter = new DSLFormatter();

    cases.forEach(([initialText, expectedFormattedText]) => {
      const formattedText = dslFormatter.formatText(initialText);

      assert.strictEqual(formattedText, expectedFormattedText);
    });
  });
});
