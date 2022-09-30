import React from "react";
import IconButton, { BaseButtonProps, ButtonProps } from "../IconButton";
import { ReactComponent as Icon } from "./plus.svg";

const NewButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <IconButton
      {...(props as BaseButtonProps)}
      icon={Icon}
      className="is-primary"
    >
      {children ?? "New"}
    </IconButton>
  );
};

export default NewButton;
