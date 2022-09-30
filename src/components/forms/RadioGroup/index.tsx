import React, { HTMLProps } from "react";
import styles from "./RadioGroup.module.sass";
import clsx from "clsx";

interface Props extends HTMLProps<HTMLFieldSetElement> {
  label?: string;
}

const RadioGroup: React.FC<Props> = ({ label, children, ...rest }) => {
  return (
    <fieldset {...rest} className={clsx("field", styles.root)}>
      {label ? <legend className="legend">{label}</legend> : null}
      {children}
    </fieldset>
  );
};

export default RadioGroup;
