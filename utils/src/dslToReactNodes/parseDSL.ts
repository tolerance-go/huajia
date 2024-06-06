import nearley from "nearley";
import grammar, { Node, Attrs } from "@huajia/dsl";

// 解析 DSL 字符串为结构化数据
export const parseDSL = (dsl: string): Node | undefined => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(dsl);
  return parser.results[0]; // 假设解析结果是一个 Node 数组
};
