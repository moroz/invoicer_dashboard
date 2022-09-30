import { InputField, InputGroup } from "@components/forms";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {}

const FormFields: React.FC<Props> = () => {
  const { register } = useFormContext();

  return (
    <>
      <InputField autoFocus label="Name:" {...register("name")} />
      <InputField label="VAT ID:" {...register("vatId")} />
      <InputField label="Address line:" {...register("addressLine")} />
      <InputGroup columns={2}>
        <InputField label="Postal code:" {...register("postalCode")} />
        <InputField label="City:" {...register("city")} />
      </InputGroup>
    </>
  );
};

export default FormFields;
