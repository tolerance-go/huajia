// 模块 'vscode' 包含 VS Code 扩展 API
// 导入该模块并在下面的代码中使用别名 vscode 引用
import * as vscode from "vscode";
import { DSLFormatter } from "./dslFormatter";

// 该方法在你的扩展被激活时调用
// 你的扩展在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {
  const dslFormatter = new DSLFormatter();
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: "huajia-dsl" },
      dslFormatter
    )
  );

  // 使用 console 输出诊断信息 (console.log) 和错误 (console.error)
  // 这行代码只会在扩展被激活时执行一次
  console.log('恭喜，你的扩展 "huajia-dsl" 现在已激活!');

  // 该命令已经在 package.json 文件中定义
  // 现在使用 registerCommand 提供该命令的实现
  // commandId 参数必须与 package.json 中的命令字段匹配
  let disposable = vscode.commands.registerCommand(
    "huajia-dsl.helloWorld",
    () => {
      // 每次执行该命令时，都会执行这里的代码
      // 向用户显示一个消息框
      vscode.window.showInformationMessage("来自 huajia-dsl 的 Hello World!");
    }
  );

  context.subscriptions.push(disposable);
}

// 该方法在你的扩展被停用时调用
export function deactivate() {}
