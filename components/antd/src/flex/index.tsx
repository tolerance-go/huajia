import React from "react";
import { Flex as AntdFlex } from "antd";

export interface _Interaction {}

export interface _Style {}

export interface _Network {}

export interface _Config {
  vertical?: boolean;
}

export type Values = [];

export type Children = {
  default?: React.ReactElement[];
};

export interface Props {
  className?: string;
  style?: _Style;
  children: Children;
  values?: Values;
  config?: _Config;
  network?: _Network;
  interaction?: _Interaction;
}

const Flex: React.FC<Props> = ({
  values,
  config,
  network,
  style,
  interaction,
  className,
  children,
}) => {
  return (
    <AntdFlex className={className} style={style} vertical={config?.vertical}>
      {children.default}
    </AntdFlex>
  );
};

export default Flex;
