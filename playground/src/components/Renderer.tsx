import { components } from "@huajia/components-antd";
import { dslToReactNodes } from "@huajia/utils";
import { useEventBus } from "../hooks/useEventBus";
import { useEffect, useState } from "react";

export const Renderer = () => {
  const [nodes, setNodes] = useState<React.ReactNode>();
  const [error, setError] = useState<string | null>(null);

  const eventBus = useEventBus();

  useEffect(() => {
    return eventBus.on("editTextChange", (newText) => {
      try {
        const nodes = dslToReactNodes(newText, components);
        setNodes(nodes);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // 设置错误信息
        } else {
          setError(String(err));
        }
      }
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        flexGrow: 1,
        borderLeft: "1px solid #ccc",
      }}
    >
      {error ? (
        <div style={{ color: "red" }}>Error rendering content: {error}</div>
      ) : (
        nodes
      )}
    </div>
  );
};
