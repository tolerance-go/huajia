import React from "react";
import { Table as AntdTable } from "antd";

export interface _Interaction {}

export interface _Style {}

export interface _Network {}

export interface _Config {}

export type Values = [string[]];

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

const Table: React.FC<Props> = ({
  values,
  config,
  network,
  style,
  interaction,
  className,
  children,
}) => {
  const columns = values?.[0].map((title) => {
    return {
      title: title,
      dataIndex: title,
      key: title,
    };
  });

  return (
    <AntdTable className={className} style={style} columns={columns}>
      {children.default || values?.[0]}
    </AntdTable>
  );
};

export default Table;
