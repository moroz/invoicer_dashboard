import React from "react";
import styles from "./InputGroup.module.sass";

interface Props {
  columns?: number;
  gap?: string;
  children?: React.ReactNode;
}

const InputGroup: React.FC<Props> = ({ gap, children, columns }) => {
  const cssProps = {
    "--group-gap": gap,
    "--column-count": String(columns)
  } as React.CSSProperties;

  return (
    <div className={styles.group} style={cssProps}>
      {children}
    </div>
  );
};

export default InputGroup;
