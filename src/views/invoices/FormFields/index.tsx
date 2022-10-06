import {
  InputGroup,
  InputField,
  InvoiceTypeSelect,
  PaymentMethodSelect,
  LocaleSelect,
  CurrencySelect
} from "@components/forms";
import LineItemEditor from "@components/LineItemEditor";
import React from "react";
import { useFormContext } from "react-hook-form";
import ClientFormFields from "@views/clients/FormFields";

interface Props {}

const FormFields: React.FC<Props> = () => {
  const { register } = useFormContext();

  return (
    <>
      <section>
        <InputGroup columns={4}>
          <InputField
            autoFocus
            label="Invoice no:"
            required
            {...register("invoiceNo", { required: true })}
          />
          <InputField
            type="date"
            required
            label="Date of issue:"
            {...register("dateOfIssue", { required: true })}
          />
          <InputField
            type="date"
            label="Date of sale:"
            required
            {...register("dateOfSale")}
          />
          <InputField
            required
            label="Place of issue:"
            {...register("placeOfIssue")}
          />
        </InputGroup>
        <InputGroup columns={4}>
          <InvoiceTypeSelect required {...register("invoiceType")} />
          <PaymentMethodSelect required {...register("paymentMethod")} />
          <LocaleSelect required {...register("locale.0")} />
          <CurrencySelect required {...register("currency")} />
        </InputGroup>
      </section>
      <section className="columns mt-1">
        <div className="column">
          <h2 className="title is-4">Seller</h2>
          <ClientFormFields prefix="seller." showBankFields />
        </div>
        <div className="column">
          <h2 className="title is-4">Buyer</h2>
          <ClientFormFields prefix="buyer." />
        </div>
      </section>
      <LineItemEditor />
    </>
  );
};

export default FormFields;
