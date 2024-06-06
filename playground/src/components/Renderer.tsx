import { components } from "@huajia/components-antd";
import { dslToReactNodes } from "@huajia/utils";
import { useEventBus } from "../hooks/useEventBus";
import { useEffect, useState } from "react";

export const Renderer = () => {
  const [state, setState] = useState<{
    nodes: React.ReactNode;
    error: string | null;
  }>({
    nodes: null,
    error: null,
  });

  const eventBus = useEventBus();

  useEffect(() => {
    return eventBus.on("editTextChange", (newText) => {
      try {
        const nodes = dslToReactNodes(newText, components);
        setState({ nodes, error: null });
      } catch (err) {
        if (err instanceof Error) {
          setState({ nodes: null, error: err.message });
        } else {
          setState({ nodes: null, error: String(err) });
        }
      }
    });
  }, [eventBus]);

  return (
    <div
      style={{
        height: "100vh",
        flexGrow: 1,
        borderLeft: "1px solid #ccc",
      }}
    >
      {state.error ? (
        <div style={{ color: "red" }}>
          Error rendering content: {state.error}
        </div>
      ) : (
        state.nodes
      )}
    </div>
  );
};
