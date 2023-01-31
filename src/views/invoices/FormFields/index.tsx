import {
  InputGroup,
  InputField,
  InvoiceTypeSelect,
  PaymentMethodSelect,
  LocaleSelect,
  CurrencySelect,
  Textarea
} from "@components/forms";
import LineItemEditor from "@components/LineItemEditor";
import React from "react";
import { useFormContext } from "react-hook-form";
import ClientFormFields from "@views/clients/FormFields";
import { ExchangeRateInputs } from "@components/forms";

interface Props {}

const FormFields: React.FC<Props> = () => {
  const { register, watch } = useFormContext();

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
          <CurrencySelect required {...register("currency")} />
          <InvoiceTypeSelect required {...register("invoiceType")} />
          <PaymentMethodSelect required {...register("paymentMethod")} />
          <InputGroup columns={2}>
            <LocaleSelect required {...register("locale.0")} />
            <LocaleSelect
              label="2nd language:"
              {...register("locale.1")}
              placeholder="None"
            />
          </InputGroup>
        </InputGroup>
        <ExchangeRateInputs />
        <Textarea label="Memo:" rows={3} {...register("memo")} />
      </section>
      <section className="columns mt-1">
        <div className="column">
          <h2 className="title is-4">Seller</h2>
          <ClientFormFields
            prefix="seller."
            showBankFields
            templateType="SELLER"
          />
        </div>
        <div className="column">
          <h2 className="title is-4">Buyer</h2>
          <ClientFormFields prefix="buyer." templateType="BUYER" />
        </div>
      </section>
      <LineItemEditor />
    </>
  );
};

export default FormFields;
