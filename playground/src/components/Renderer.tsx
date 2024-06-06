import { components } from "@huajia/components-antd";
import { dslToReactNodes } from "@huajia/utils";

export const Renderer = () => {
  return (
    <div
      style={{ height: "100vh", width: "50%", borderLeft: "1px solid #ccc" }}
    >
      {dslToReactNodes('Button "label" ', components)}
    </div>
  );
};
