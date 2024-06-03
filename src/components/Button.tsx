import React from "react";
import { Button as AntdButton } from "antd";

interface ButtonProps {
  label: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ label, color }) => {
  return <AntdButton style={{ backgroundColor: color }}>{label}</AntdButton>;
};

export default Button;
