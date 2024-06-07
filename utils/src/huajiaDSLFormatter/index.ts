import nearley from "nearley";
import grammar, { Attrs, Node, Value } from "@huajia/dsl";

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

  private formatParsedResult(
    node: Node,
    indentLevel: number,
    slotPrefix: string = ""
  ): string {
    const tabIndent = "  ";
    const indent = tabIndent.repeat(indentLevel);
    let formattedText = "";

    formattedText += `${indent}${slotPrefix}`;

    if (node.scopes.length > 0) {
      formattedText += `${node.scopes.map((scope) => scope.scope).join(".")}.`;
    }

    formattedText += node.name;

    if (node.id) {
      formattedText += `#${node.id}`;
    }

    if (node.modifiers.length > 0) {
      formattedText += `.${node.modifiers.join(".")}`;
    }

    if (node.values.length > 0) {
      formattedText +=
        " " +
        node.values
          .map((val) => {
            return this.formatValueItem(val, indentLevel + 1);
          })
          .join(" ");
    }
    node.settings.forEach((setting) => {
      if (setting[1].length > 0) {
        formattedText += ` ${setting[0]} {\n`;
        setting[1].forEach(([key, attrModifiers, value]) => {
          formattedText += `${indent}${tabIndent}${key}${
            attrModifiers.length ? `.${attrModifiers.join(".")}` : ""
          }: ${this.formatValueItem(value, indentLevel + 2)}\n`;
        });
        formattedText += `${indent}}`;
      } else {
        formattedText += ` ${setting[0]} {}`;
      }
    });
    if (node.children.nodes.length > 0) {
      formattedText += " {\n";

      node.children.nodes.forEach(([scope, child]) => {
        const key = scope === "default" ? "" : `${scope}: `;

        formattedText += this.formatParsedResult(child, indentLevel + 1, key);
      });
      formattedText += `${indent}}\n`;
    } else {
      formattedText += "\n";
    }

    return formattedText;
  }

  private formatValueItem(
    value: Value | Attrs,
    indentLevel: number
  ): string | number | boolean {
    const tabIndent = "  ";
    const indent = tabIndent.repeat(indentLevel);

    if (Array.isArray(value)) {
      if (value.length > 0 && Array.isArray(value[0])) {
        // Handle Attrs type
        return `{\n${(value as grammar.Attrs)
          .map(
            ([key, attrModifiers, val]) =>
              `${indent}${key}${
                attrModifiers.length ? `.${attrModifiers.join(".")}` : ""
              }: ${this.formatValueItem(val, indentLevel + 1)}`
          )
          .join("\n")}\n${tabIndent.repeat(indentLevel - 1)}}`;
      }
      // Handle ArrayValue type
      return `[${value
        .map((item) => this.formatValueItem(item, indentLevel))
        .join(", ")}]`;
    }

    if (typeof value === "string") {
      return `"${value}"`;
    }

    return value;
  }
}
