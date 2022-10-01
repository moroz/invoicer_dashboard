import { InputField, InputGroup } from "@components/forms";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  prefix?: string;
}

const FormFields: React.FC<Props> = ({ prefix = "" }) => {
  const { register } = useFormContext();

  return (
    <>
      <InputField
        autoFocus={!prefix}
        label="Name:"
        {...register(prefix + "name")}
      />
      <InputField label="VAT ID:" {...register(prefix + "vatId")} />
      <InputField label="Address line:" {...register(prefix + "addressLine")} />
      <InputGroup columns={2}>
        <InputField label="Postal code:" {...register(prefix + "postalCode")} />
        <InputField label="City:" {...register(prefix + "city")} />
      </InputGroup>
    </>
  );
};

export default FormFields;
