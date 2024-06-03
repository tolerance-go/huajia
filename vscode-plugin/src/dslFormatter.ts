import * as vscode from "vscode";

export class DSLFormatter implements vscode.DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: vscode.TextDocument
  ): vscode.TextEdit[] {
    const text = document.getText();
    const formattedText = this.formatText(text);
    const entireRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );
    return [vscode.TextEdit.replace(entireRange, formattedText)];
  }

  public compactText(text: string): string {
    return text.replace(/\s+/g, "");
  }

  public formatText(text: string): string {
    let formattedText = this.formatWithIndentation(this.compactText(text));
    return formattedText;
  }

  // Method to handle indentation
  public formatWithIndentation(text: string): string {
    let indentLevel = 0;
    const indentSize = 2;
    let formattedText = "";
    const addIndentation = () => " ".repeat(indentLevel * indentSize);

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char === "{") {
        indentLevel++;
        formattedText += " {\n" + addIndentation();
      } else if (char === "}") {
        indentLevel--;
        formattedText += "\n" + addIndentation() + "}";
      } else {
        formattedText += char;
      }

      if (i < text.length - 1 && text[i + 1] === "{") {
        formattedText += "\n" + addIndentation();
      } else if (i < text.length - 1 && text[i + 1] === "}") {
        formattedText += "\n" + addIndentation();
      }
    }

    return formattedText.trim();
  }
}
