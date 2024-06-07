import nearley from "nearley";
import grammar, { Node, Value } from "@huajia/dsl";

export class HuajiaDSLFormatter {
  public formatText(text: string): string {
    // 创建一个解析器实例
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try {
      // 解析输入
      parser.feed(text);

      // 获取解析结果
      const parsedResult = parser.results[0];

      // 格式化解析结果
      return this.formatParsedResult(parsedResult, 0);
    } catch (error) {
      console.error("Error parsing the text:", error);
      return text; // 返回原始文本，以防解析失败
    }
  }

  private formatParsedResult(node: Node, indentLevel: number): string {
    const tabIndent = "  ";
    const indent = tabIndent.repeat(indentLevel);
    let formattedText = "";

    formattedText += `${indent}${node.name}`;
    if (node.scopes.length > 0) {
      formattedText += `.${node.scopes.join(".")}`;
    }
    if (node.slots.length > 0) {
      formattedText += `:${node.slots.join(":")}`;
    }
    if (node.values.length > 0) {
      formattedText +=
        " " +
        node.values
          .map((val) => {
            return this.formatValueItem(val);
          })
          .join(" ");
    }
    node.settings.forEach((setting) => {
      if (Object.keys(setting[1]).length > 0) {
        formattedText += ` ${setting[0]} {\n`;
        Object.entries(setting[1]).forEach(([key, value]) => {
          formattedText += `${indent}${tabIndent}${key}: ${this.formatValueItem(value)}\n`;
        });
        formattedText += `${indent}}`;
      } else {
        formattedText += ` ${setting[0]} {}`;
      }
    });
    if (node.children.nodes.length > 0) {
      formattedText += " {\n";
      node.children.nodes.forEach((child) => {
        formattedText += this.formatParsedResult(child, indentLevel + 1);
      });
      formattedText += `${indent}}\n`;
    } else {
      formattedText += "\n";
    }

    return formattedText;
  }

  private formatValueItem(value: Value): string | number | boolean {
    if (Array.isArray(value)) {
      return `[${value.map((item) => this.formatValueItem(item)).join(", ")}]`;
    }

    if (typeof value === "string") {
      return `"${value}"`;
    }

    return value;
  }
}
