import { components } from "@huajia/components-antd";
import { dslToReactNodes } from "@huajia/utils";
import { useLayoutEffect, useState } from "react";
import { useEventBus } from "../hooks/useEventBus";

export const Renderer = () => {
  const [state, setState] = useState<{
    nodes: React.ReactNode;
    error: string | null;
  }>({
    nodes: null,
    error: null,
  });

  const eventBus = useEventBus();

  const render = (text: string) => {
    try {
      const nodes = dslToReactNodes(text, components);
      setState({ nodes, error: null });
    } catch (err) {
      if (err instanceof Error) {
        setState({ nodes: null, error: err.message });
      } else {
        setState({ nodes: null, error: String(err) });
      }
    }
  };

  useLayoutEffect(() => {
    return eventBus.on("editTextChange", (newText) => {
      render(newText);
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
