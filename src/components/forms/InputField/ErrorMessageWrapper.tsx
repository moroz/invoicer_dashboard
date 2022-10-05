import { ErrorMessage } from "@hookform/error-message";

const ERROR_MESSAGES: Record<any, string> = {
  required: "can't be blank"
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
      className="error-explanation help is-danger"
      errors={errors}
      name={name}
      message={error.message || ERROR_MESSAGES[error.type]}
      {...rest}
    />
  );
};

export default ErrorMessageWrapper;
