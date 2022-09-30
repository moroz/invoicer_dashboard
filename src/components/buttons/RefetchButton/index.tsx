import React from "react";
import { ReactComponent as Icon } from "./rotate.svg";
import IconButton, { ButtonProps } from "../IconButton";

interface Props extends Omit<ButtonProps, "icon"> {}

const RefetchButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <IconButton {...(props as ButtonProps)} icon={Icon}>
      {children ?? "Refresh"}
    </IconButton>
  );
};

export default RefetchButton;
