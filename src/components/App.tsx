import { StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import React from "react";

export const App: React.FC<{
  cache: Entity;
  children: React.ReactNode;
}> = ({ cache, children }) => {
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
