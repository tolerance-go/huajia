export default function () {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        if (source.startsWith(".") && !source.endsWith(".js")) {
          path.node.source.value = `${source}.js`;
        }
      },
      ExportDeclaration(path) {
        const source = path.node.source && path.node.source.value;
        if (source && source.startsWith(".") && !source.endsWith(".js")) {
          path.node.source.value = `${source}.js`;
        }
      },
    },
  };
}
