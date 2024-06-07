import * as monaco from "monaco-editor";
import nearley from "nearley";
import grammar, { Node } from "@huajia/dsl";

class HuajiaCompletionProvider {
  nodeNames: string[];

  constructor(nodeNames: string[]) {
    this.nodeNames = nodeNames;
  }

  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ): monaco.languages.CompletionList {
    const wordInfo = model.getWordUntilPosition(position);
    const range = new monaco.Range(
      position.lineNumber,
      wordInfo.startColumn,
      position.lineNumber,
      wordInfo.endColumn
    );

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(model.getValue());

    const parsedResult = parser.results[0];

    const suggestions: monaco.languages.CompletionItem[] = [];

    const isCursorInChildrenBrackets = (node: Node): boolean => {
      if (!node.children.start || !node.children.end) {
        return false;
      }

      const startOffset = node.children.start.offset;
      const endOffset = node.children.end.offset;

      const cursorOffset = model.getOffsetAt(position);
      return cursorOffset > startOffset && cursorOffset < endOffset;
    };

    const traverseNodes = (nodes: Node[]) => {
      for (const node of nodes) {
        if (isCursorInChildrenBrackets(node)) {
          if (
            !node.children.nodes.some(
              ([, child]) =>
                model.getOffsetAt(position) > child.start.offset &&
                model.getOffsetAt(position) < child.end.offset
            )
          ) {
            this.nodeNames.forEach((name) => {
              suggestions.push({
                label: name,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: name,
                range: range,
              });
            });
          }
        }
        traverseNodes(node.children.nodes.map(([, node]) => node));
      }
    };

    traverseNodes([parsedResult]);

    return { suggestions: suggestions };
  }
}

export default HuajiaCompletionProvider;
