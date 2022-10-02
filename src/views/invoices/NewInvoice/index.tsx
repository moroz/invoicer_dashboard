import React, { useCallback } from "react";
import Layout from "@views/Layout";
import {
  CurrencySelect,
  FormWrapper,
  InputField,
  InputGroup,
  InvoiceTypeSelect,
  LocaleSelect
} from "@components/forms";
import { useFieldArray, useForm } from "react-hook-form";
import { InvoiceParams, LineItemParams } from "@api/interfaces";
import { today } from "@/lib/dateHelpers";
import ClientFormFields from "@views/clients/FormFields";
import { PaymentMethodSelect, VatRateSelect } from "@components/forms";
import { DeleteButton, NewButton, SubmitButton } from "@components/buttons";
import { useCreateInvoiceMutation } from "@api/mutations";
import { useNavigate } from "react-router-dom";
import { setFormErrors } from "@/lib/formHelpers";

interface Props {}

const EMPTY_LINE_ITEM: LineItemParams = {
  quantity: 1,
  description: "",
  vatRate: "TWENTY_THREE",
  unitNetPrice: 0
};

const NewInvoice: React.FC<Props> = () => {
  const methods = useForm<InvoiceParams>({
    defaultValues: {
      dateOfIssue: today(),
      dateOfSale: today(),
      lineItems: [EMPTY_LINE_ITEM]
    }
  });
  const { register, control, setError } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems"
  });
  const [mutate] = useCreateInvoiceMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (params: InvoiceParams) => {
      const res = await mutate({ variables: { params } });
      if (res.data?.result.success) {
        navigate(`/invoices/${res.data.result.data.id}`);
      } else {
        setFormErrors(setError, res.data?.result.errors);
      }
    },
    [mutate]
  );

  return (
    <Layout title="Issue an invoice">
      <FormWrapper {...methods} onSubmit={onSubmit}>
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
        <section className="mt-1 mb-5">
          <h2 className="title is-4">Invoice entries</h2>
          {fields.map((field, number) => (
            <InputGroup key={field.id} columns={9} gap="1rem">
              <InputField
                colSpan={4}
                label="Name"
                required
                {...register(`lineItems.${number}.description`)}
              />
              <InputField
                label="Unit"
                {...register(`lineItems.${number}.unit`)}
              />
              <InputField
                label="Quantity"
                required
                {...register(`lineItems.${number}.quantity`)}
              />
              <InputField
                label="Unit net price"
                required
                {...register(`lineItems.${number}.unitNetPrice`)}
              />
              <VatRateSelect
                {...register(`lineItems.${number}.vatRate`)}
                required
              />
              {fields.length > 1 && (
                <DeleteButton onClick={() => remove(number)} className="mb-3" />
              )}
            </InputGroup>
          ))}
          <NewButton onClick={() => append(EMPTY_LINE_ITEM)} />
        </section>
        <SubmitButton>Save invoice</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default NewInvoice;
