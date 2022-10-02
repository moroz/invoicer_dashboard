import React from "react";
import Select from "./Select";

interface MakeSelectComponentParams {
  options: Record<string, string>;
  label?: string;
}

interface DerivedComponentProps extends React.HTMLProps<HTMLSelectElement> {
  label?: string;
}

const makeSelectComponent = ({
  options: optionsObject,
  label: defaultLabel
}: MakeSelectComponentParams) => {
  const options = Object.entries(optionsObject).map(([value, label]) => ({
    value,
    label
  }));

  return React.forwardRef(
    ({ label, ...props }: DerivedComponentProps, ref: any) => {
      return (
        <Select
          options={options}
          label={label ?? defaultLabel}
          {...props}
          ref={ref}
        />
      );
    }
  );
};

export default makeSelectComponent;
