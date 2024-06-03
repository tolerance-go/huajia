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
  private formatText(text: string): string {
    const lines = text.split("\n");
    const formattedLines: string[] = [];
    let indentLevel = 0;
    const indentSize = 2;
  
    const increaseIndent = () => {
      indentLevel += 1;
    };
  
    const decreaseIndent = () => {
      indentLevel = Math.max(0, indentLevel - 1);
    };
  
    const trimAndIndentLine = (line: string) => {
      return " ".repeat(indentLevel * indentSize) + line.trim();
    };
  
    let inAttributeBlock = false;
    let attributeLines: string[] = [];
  
    lines.forEach((line) => {
      line = line.trim();
  
      if (inAttributeBlock) {
        if (line.endsWith("}")) {
          attributeLines.push(line);
          formattedLines.push(
            trimAndIndentLine(attributeLines.join(" ").trim())
          );
          attributeLines = [];
          inAttributeBlock = false;
          decreaseIndent();
        } else {
          // Format each attribute in a new line with proper indentation
          const attributes = line.split(" ").filter(attr => attr !== "");
          attributes.forEach(attr => {
            formattedLines.push(trimAndIndentLine(attr));
          });
        }
      } else {
        if (line.startsWith("}")) {
          decreaseIndent();
        }
  
        if (line.endsWith("{") && !line.includes("}")) {
          formattedLines.push(trimAndIndentLine(line));
          increaseIndent();
        } else if (line.includes("{") && line.includes("}")) {
          const openBraceIndex = line.indexOf("{");
          const closeBraceIndex = line.lastIndexOf("}");
  
          if (openBraceIndex < closeBraceIndex) {
            formattedLines.push(trimAndIndentLine(line));
          } else {
            inAttributeBlock = true;
            attributeLines.push(line);
            increaseIndent();
          }
        } else if (line.endsWith("}")) {
          decreaseIndent();
          formattedLines.push(trimAndIndentLine(line));
        } else {
          formattedLines.push(trimAndIndentLine(line));
        }
      }
    });
  
    return formattedLines.join("\n");
  }
  
}
