import clsx from "clsx";
import React from "react";
import styles from "./ButtonGroup.module.sass";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const ButtonGroup: React.FC<Props> = ({ className, children }) => {
  return <div className={clsx(styles.group, className)}>{children}</div>;
};

export default ButtonGroup;
