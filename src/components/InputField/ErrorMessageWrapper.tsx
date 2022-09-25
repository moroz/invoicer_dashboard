import { ErrorMessage } from "@hookform/error-message";

const ERROR_MESSAGES: Record<any, string> = {
  required: "不能為空"
};

const ErrorMessageWrapper: typeof ErrorMessage = ({
  errors,
  name,
  ...rest
}) => {
  if (!errors?.[name]) return null;

  const error = errors[name];
  return (
    <ErrorMessage
      as="span"
      className="error-explanation"
      errors={errors}
      name={name}
      message={error.message || ERROR_MESSAGES[error.type]}
      {...rest}
    />
  );
};

export default ErrorMessageWrapper;
