import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import { HuajiaDSLFormatter } from "@huajia/utils"; // 假设你将 HuajiaDSLFormatter 类定义在这个文件中

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const Editor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: `Root {
  Page "sdflj" @css {
    width: '100'
    height: '100'
  } @config {
    width: '100'
    height: '100'
  } {
    Nav "sdfljsf"
    Header "aldfj" {
      H "asdlfjasdf"
      H "asldjflajs"
    }
  }
}
`,
        language: "javascript", // 你的 DSL 语言
        theme: "vs-dark",
      });

      // 添加内容变化监听器
      editorInstance.current.onDidChangeModelContent(() => {
        // const value = editorInstance.current?.getValue() || "";
      });

      // 添加快捷键监听器
      editorInstance.current.addCommand(
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
        () => {
          if (editorInstance.current) {
            console.log("开始格式化");
            const formatter = new HuajiaDSLFormatter();
            const currentValue = editorInstance.current.getValue();
            const cursorPosition = editorInstance.current.getPosition();
            const formattedValue = formatter.formatText(currentValue);
            editorInstance.current.setValue(formattedValue);
            if (cursorPosition) {
              editorInstance.current.setPosition(cursorPosition);
            }
          }
        }
      );
    }

    // 组件卸载时销毁编辑器实例
    return () => {
      editorInstance.current?.dispose();
    };
  }, []);

  return <div ref={editorRef} style={{ height: "100vh", width: "50%" }}></div>;
};

export default Editor;
