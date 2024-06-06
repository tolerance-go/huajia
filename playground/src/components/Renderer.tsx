import { components } from "@huajia/components-antd";
import { dslToReactNodes } from "@huajia/utils";
import { useEventBus } from "../hooks/useEventBus";
import { useEffect, useState } from "react";

export const Renderer = () => {
  const [text, setText] = useState("");

  const eventBus = useEventBus();

  useEffect(() => {
    return eventBus.on("editTextChange", (newText) => {
      setText(newText);
    });
  }, []);

  return (
    <div
      style={{ height: "100vh", width: "50%", borderLeft: "1px solid #ccc" }}
    >
      {dslToReactNodes(text, components)}
    </div>
  );
};
