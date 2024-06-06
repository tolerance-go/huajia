import React from "react";
import nearley from "nearley";
import grammar, { Node, Attrs } from "@huajia/dsl";

// 解析 DSL 字符串为结构化数据
const parseDSL = (dsl: string): Node => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(dsl);
  return parser.results[0]; // 假设解析结果是一个 Node 数组
};

// 将 Node 转换为 React 元素
const nodeToReactElement = (
  node: Node,
  components: { [key: string]: React.FC<any> }
): React.ReactNode => {
  const Component = components[node.name];
  if (!Component) {
    throw new Error(`Component for ${node.name} not found in components.`);
  }

  const settings = node.settings.reduce((acc, [key, value]) => {
    acc[key.slice(1)] = value; // 移除 @ 符号
    return acc;
  }, {} as Record<string, Attrs>);

  const children = node.children.map((child, index) =>
    nodeToReactElement(child, components)
  );

  return (
    <Component key={node.name} {...settings} values={node.values}>
      {children}
    </Component>
  );
};

export const dslToReactNodes = (
  dsl: string,
  components: { [key: string]: React.FC<any> }
) => {
  const node = parseDSL(dsl);
  return [node].map((node, index) => nodeToReactElement(node, components));
};
