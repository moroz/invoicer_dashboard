import { ClientTemplateType } from "@api/interfaces";
import { InputField, InputGroup } from "@components/forms";
import React from "react";
import { useFormContext } from "react-hook-form";
import ClientAutocomplete from "../ClientAutocomplete";

interface Props {
  prefix?: string;
  showBankFields?: boolean;
  templateType?: ClientTemplateType;
}

const FormFields: React.FC<Props> = ({
  prefix = "",
  showBankFields = false,
  templateType = "BUYER"
}) => {
  const { register } = useFormContext();

  return (
    <>
      {prefix ? (
        <ClientAutocomplete type={templateType} />
      ) : (
        <InputField
          autoFocus
          label="Name:"
          required
          {...register(prefix + "name")}
        />
      )}
      <InputField label="VAT ID:" {...register(prefix + "vatId")} />
      <InputField label="Address line:" {...register(prefix + "addressLine")} />
      <InputGroup columns={2}>
        <InputField label="Postal code:" {...register(prefix + "postalCode")} />
        <InputField label="City:" {...register(prefix + "city")} />
      </InputGroup>
      {showBankFields && (
        <>
          <InputField label="Account no:" {...register(prefix + "accountNo")} />
          <InputGroup columns={2}>
            <InputField
              label="BIC/SWIFT code:"
              {...register(prefix + "bicCode")}
            />
            <InputField label="Bank:" {...register(prefix + "bankName")} />
          </InputGroup>
        </>
      )}
    </>
  );
};

export default FormFields;
