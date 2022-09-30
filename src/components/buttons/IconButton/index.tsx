import clsx from "clsx";
import React from "react";
import styles from "./IconButton.module.sass";

export interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  icon: React.FC;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx("button", className, styles.button)}
      {...props}
      type="button"
    >
      <Icon /> {children}
    </button>
  );
};

export default IconButton;
