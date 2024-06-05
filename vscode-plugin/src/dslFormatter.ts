import { HuajiaDSLFormatter } from "@huajia/utils/dist/huajiaDSLFormatter";
import * as vscode from "vscode";

export class DSLFormatter implements vscode.DocumentFormattingEditProvider {
  huajiaDSLFormatter: HuajiaDSLFormatter = new HuajiaDSLFormatter();

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

  public formatText(text: string): string {
    return this.huajiaDSLFormatter.formatText(text);
  }
}
