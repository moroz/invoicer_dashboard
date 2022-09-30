import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

const SubmitButton: React.FC<Props> = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(className, "button is-success")}
      type="submit"
    >
      {children ?? "Submit"}
    </button>
  );
};

export default SubmitButton;
