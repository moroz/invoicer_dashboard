import React from "react";
import { ReactComponent as Icon } from "./rotate.svg";
import IconButton, { IconButtonProps } from "../IconButton";

interface Props extends Omit<IconButtonProps, "icon"> {}

const RefetchButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <IconButton {...props} icon={Icon}>
      {children ?? "Refresh"}
    </IconButton>
  );
};

export default RefetchButton;
