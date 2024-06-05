import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";

const Editor = ({ onChange }: { onChange: (code: string) => void }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: "",
        language: "javascript", // 你的 DSL 语言
        theme: "vs-dark",
      });

      // 添加内容变化监听器
      editorInstance.current.onDidChangeModelContent(() => {
        const value = editorInstance.current?.getValue() || "";
        onChange(value);
      });
    }

    // 组件卸载时销毁编辑器实例
    return () => {
      editorInstance.current?.dispose();
    };
  }, [onChange]);

  return <div ref={editorRef} style={{ height: "100vh", width: "50%" }}></div>;
};

export default Editor;
