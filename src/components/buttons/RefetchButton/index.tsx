import React from "react";
import { ReactComponent as Icon } from "./rotate.svg";
import IconButton, { BaseButtonProps, ButtonProps } from "../IconButton";

const RefetchButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <IconButton {...(props as BaseButtonProps)} icon={Icon}>
      {children ?? "Refresh"}
    </IconButton>
  );
};

export default RefetchButton;
