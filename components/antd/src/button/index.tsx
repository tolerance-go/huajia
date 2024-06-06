import React from "react";
import { Button as AntdButton } from "antd";

export interface _Interaction {}

export interface _Style {}

export interface _Network {}

export interface _Config {}

export type Values = [string];

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

const Button: React.FC<Props> = ({
  values,
  config,
  network,
  style,
  interaction,
  className,
  children,
}) => {
  return (
    <AntdButton className={className} style={style}>
      {children.default || values?.[0]}
    </AntdButton>
  );
};

export default Button;
