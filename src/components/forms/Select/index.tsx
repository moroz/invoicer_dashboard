import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
}

const Select = React.forwardRef(
  (
    { options, name, label, placeholder, id = name, ...props }: SelectProps,
    ref: any
  ) => {
    return (
      <div className="field">
        {label ? (
          <label htmlFor={id} className="label">
            {label}
          </label>
        ) : null}
        <div className="select is-fullwidth">
          <select className="select" id={id} name={name} {...props} ref={ref}>
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);

export default Select;
