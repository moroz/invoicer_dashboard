import { ClientOptionItem, ClientTemplateType } from "@api/interfaces";
import { InputField, InputGroup } from "@components/forms";
import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ClientAutocomplete from "../ClientAutocomplete";

interface Props {
  prefix?: string;
  showBankFields?: boolean;
  templateType?: ClientTemplateType;
}

export const AUTOCOMPLETABLE_FIELDS: (keyof ClientOptionItem)[] = [
  "name",
  "vatId",
  "addressLine",
  "city",
  "accountNo",
  "postalCode",
  "bicCode",
  "bankName"
];

const FormFields: React.FC<Props> = ({
  prefix = "",
  showBankFields = false,
  templateType = "BUYER"
}) => {
  const { register, setValue } = useFormContext();

  const onSelectClientTemplate = useCallback(
    (prefix: "seller." | "buyer.") => (client: ClientOptionItem) => {
      AUTOCOMPLETABLE_FIELDS.forEach((field) => {
        setValue(`${prefix}${field}` as any, client[field] || "");
      });
    },
    [setValue]
  );

  return (
    <>
      {prefix ? (
        <ClientAutocomplete
          name={`${prefix}.name`}
          type={templateType}
          onSelect={onSelectClientTemplate(prefix as any)}
        />
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
