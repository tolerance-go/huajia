import * as assert from "assert";
import * as vscode from "vscode";
import { DSLFormatter } from "../dslFormatter";

suite("DSL Formatter Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Format DSL code compactText", async () => {
    const initialText = `Root {
  Element  "value1" 'value2' 100 true @config {
    attr:  "attr"
    other: 'other'

  } {
    
  }
  Element @config {
    attr: 'attr2'
  } {
    Element "value2" {}
  }
}
`;

    const expectedFormattedText = `Root {
  Element "value1" 'value2' 100 true @config {
    attr: "attr"
    other: 'other'
  } {}
  Element @config {
    attr: 'attr2'
  } {
    Element "value2" {}
  }
}
`;

    const dslFormatter = new DSLFormatter();
    const formattedText = dslFormatter.formatText(initialText);

    assert.strictEqual(formattedText, expectedFormattedText);
  });
});
