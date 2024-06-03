import { createCache, extractStyle } from "@ant-design/cssinjs";
import React from "react";
import { renderToString } from "react-dom/server";
import { components } from "./components";
import { App } from "./components/App";

interface RenderRequest {
  component: string;
  props: { [key: string]: any };
}

const root = ({ component, props }: RenderRequest) => {
  const Component = React.createElement(components[component], props);

  // SSR Render
  const cache = createCache();
  const html = renderToString(<App cache={cache}>{Component}</App>);

  // Grab style from cache
  const styleText = extractStyle(cache);

  // Mix with style
  return `
      <!DOCTYPE html>
      <html>
        <head>
          ${styleText}
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `;
};

export default root;
