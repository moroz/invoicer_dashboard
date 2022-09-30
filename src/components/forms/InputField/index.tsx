import React, { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessageWrapper";
import clsx from "clsx";
import styles from "./InputField.module.sass";

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  label: string;
  helperText?: string;
  horizontal?: boolean;
  monospace?: boolean;
}

const InputField = React.forwardRef(
  (
    {
      name,
      label,
      helperText,
      className,
      horizontal,
      monospace,
      required,
      ...rest
    }: Props,
    ref: any
  ) => {
    const {
      formState: { errors }
    } = useFormContext();

    const labelTag = (
      <label className={clsx("label", required && styles.required)}>
        {label}
      </label>
    );

    const content = (
      <>
        <input
          className={clsx(
            "input",
            errors[name] && "is-danger",
            monospace && "is-family-monospace"
          )}
          name={name}
          required={required}
          {...rest}
          ref={ref}
        />
        <ErrorMessage name={name} errors={errors} />
        {helperText ? <span className="helper-text">{helperText}</span> : null}
      </>
    );

    return (
      <div
        className={clsx(
          "field input-field",
          { "has-error": errors[name], "is-horizontal": horizontal },
          monospace && "is-family-monospace",
          className
        )}
      >
        {!horizontal ? (
          <>
            {labelTag}
            {content}
          </>
        ) : (
          <>
            <div className="field-label is-normal">{labelTag}</div>
            <div className="field-body">
              <div className="field">{content}</div>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default InputField;
