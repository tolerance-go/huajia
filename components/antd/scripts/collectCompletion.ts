import fs from "fs";
import path from "path";
import ts from "typescript";

interface DefaultExport {
  filePath: string;
  name: string;
}

function getFilesInDirectory(dir: string, extension: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesInDirectory(filePath, extension));
    } else if (file.endsWith(extension)) {
      results.push(filePath);
    }
  });

  return results;
}

function parseFile(filePath: string): DefaultExport[] {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );
  const defaultExports: DefaultExport[] = [];

  function visit(node: ts.Node) {
    if (ts.isExportAssignment(node) && node.isExportEquals === undefined) {
      if (ts.isIdentifier(node.expression)) {
        defaultExports.push({
          filePath,
          name: node.expression.escapedText.toString(),
        });
      } else if (ts.isCallExpression(node.expression)) {
        const name = node.expression.expression.getText(sourceFile);
        defaultExports.push({ filePath, name });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return defaultExports;
}

function collectDefaultExports(
  dir: string,
  extension: string
): DefaultExport[] {
  const files = getFilesInDirectory(dir, extension);
  let allDefaults: DefaultExport[] = [];

  files.forEach((file) => {
    const defaultExports = parseFile(file);
    allDefaults = allDefaults.concat(defaultExports);
  });

  return allDefaults;
}

// 使用示例
const dir = "./src"; // 替换为你的文件夹路径
const extension = "index.tsx"; // 替换为你的文件扩展名
const defaultExports = collectDefaultExports(dir, extension);
console.log(defaultExports);
