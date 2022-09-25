import React, { HTMLProps } from "react";
import styles from "./RadioButton.module.sass";

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
}

const RadioButton = React.forwardRef(({ label, ...rest }: Props, ref: any) => {
  return (
    <label className={styles.root}>
      <input {...rest} type="radio" ref={ref} />
      <span>{label}</span>
    </label>
  );
});

export default RadioButton;
