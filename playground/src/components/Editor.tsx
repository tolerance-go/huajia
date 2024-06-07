import { HuajiaDSLFormatter } from "@huajia/utils"; // 假设你将 HuajiaDSLFormatter 类定义在这个文件中
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
// import grammar from '@huajia/dsl'; // 替换为你 DSL 语法文件的实际路径

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { useEventBus } from "../hooks/useEventBus";
import HuajiaCompletionProvider from "../utils/HuajiaCompletionProvider";
import defaultExports from "@huajia/components-antd/defaultExports.json";

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

// 注册自定义DSL语言
monaco.languages.register({ id: "huajia" });

// 为DSL语言配置tokenizer
monaco.languages.setMonarchTokensProvider("huajia", {
  tokenizer: {
    root: [
      // 使用内部预设
      [/"(?:\\["\\]|[^\n"\\])*"|'(?:\\['\\]|[^\n'\\])*'/, "string"],
      [/[0-9]+(?:\.[0-9]+)?/, "number"],
      [/true|false/, "constant.language.boolean"],
      [/\{/, "delimiter.brace"],
      [/\}/, "delimiter.brace"],
      [/\[/, "delimiter.bracket"],
      [/\]/, "delimiter.bracket"],
      [/\/\/.*$/, "comment"],
      [/[A-Z][a-zA-Z]*/, "type.identifier"],
      [/[a-z][a-zA-Z]*/, "key"],
      // 自定义
      [/@[a-zA-Z]*/, "setting"],
      [/#[a-zA-Z]*/, "identifier"],
      [/(\.)([a-z][a-zA-Z]*)/, ["delimiter", "modifier"]],
    ],
  },
});

// 配置编辑器的语言模式
monaco.languages.setLanguageConfiguration("huajia", {
  brackets: [
    ["{", "}"],
    ["[", "]"],
  ],
  comments: {
    lineComment: "//",
  },
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
});

// 自定义主题
monaco.editor.defineTheme("custom-vs-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "setting", foreground: "FFA500" },
    { token: "identifier", foreground: "B694F9" }, // 浅紫色
    { token: "modifier", foreground: "5FCBFE" }, // 浅蓝色
  ],
  colors: {},
});

const nodeNames = defaultExports.map((item) => item.name);

const completionProvider = new HuajiaCompletionProvider(nodeNames);

monaco.languages.registerCompletionItemProvider("huajia", {
  provideCompletionItems: function (
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    return completionProvider.provideCompletionItems(model, position);
  },
});

const Editor = () => {
  const eventBus = useEventBus();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      const initialValue = `Flex @config {
  vertical: true
} {
  default: antd.Button#btnA.scopeA 'label'
  default: antd.Button#btnB.scopeA 'label' @css {
    string.modifierA.modifierB: 'string'
    boolean: true
    number: 100
  }
}
`;

      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: initialValue,
        language: "huajia", // 使用自定义DSL语言
        theme: "custom-vs-dark",
      });

      // 添加内容变化监听器
      editorInstance.current.onDidChangeModelContent(() => {
        const value = editorInstance.current?.getValue() || "";
        eventBus.emit("editTextChange", value);
      });

      // 手动触发一次
      eventBus.emit("editTextChange", initialValue);

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

            if (formattedValue !== currentValue) {
              editorInstance.current.setValue(formattedValue);
            }

            if (cursorPosition) {
              editorInstance.current.setPosition(cursorPosition);
            }
          }
        }
      );

      // 添加撤销快捷键监听器
      editorInstance.current.addCommand(
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyZ,
        () => {
          if (editorInstance.current) {
            console.log("撤销操作");
            editorInstance.current.trigger("keyboard", "undo", null);
          }
        }
      );
    }

    // 组件卸载时销毁编辑器实例
    return () => {
      editorInstance.current?.dispose();
    };
  }, []);

  return <div ref={editorRef} style={{ height: "100vh", width: "45%" }}></div>;
};

export default Editor;
