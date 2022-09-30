import React from "react";
import { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Textarea.module.sass";

interface Props extends HTMLProps<HTMLTextAreaElement> {
  label: string;
  name: string;
  helperText?: string | React.ReactNode;
}

const Textarea = React.forwardRef(
  (
    { name, id = name, maxLength, label, helperText, ...rest }: Props,
    ref: any
  ) => {
    const { watch } = useFormContext();
    const value = watch(name);
    const length = value?.length ?? 0;
    return (
      <div className="field">
        <label className="label" htmlFor={id}>
          {label}
        </label>
        <div className={styles.wrapper}>
          <textarea
            {...rest}
            className="textarea"
            name={name}
            ref={ref}
            maxLength={maxLength}
          ></textarea>
          {maxLength ? (
            <span className={styles.count}>
              {length} / {maxLength}
            </span>
          ) : null}
        </div>
        {helperText ? <span className="helper-text">{helperText}</span> : null}
      </div>
    );
  }
);

export default Textarea;
