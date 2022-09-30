import { UseFormSetError } from "react-hook-form";
import { ErrorObject } from "@api/interfaces";

export const setFormErrors = (
  setError: UseFormSetError<any>,
  errors?: ErrorObject[] | null
) => {
  if (!errors?.length) return;
  errors.forEach(({ key, message, validation }) => {
    setError(key, { type: validation, message });
  });
};
