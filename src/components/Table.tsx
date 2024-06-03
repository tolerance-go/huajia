import React from "react";
import { Table as AntdTable } from "antd";

interface TableProps {
  data: Array<{ key: string; name: string; age: number; address: string }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return <AntdTable columns={columns} dataSource={data} />;
};

export default Table;
