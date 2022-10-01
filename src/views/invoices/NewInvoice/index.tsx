import React from "react";
import Layout from "@views/Layout";
import { FormWrapper, InputField, InputGroup } from "@components/forms";
import { useFieldArray, useForm } from "react-hook-form";
import { InvoiceParams } from "@api/interfaces";
import { today } from "@/lib/dateHelpers";
import ClientFormFields from "@views/clients/FormFields";
import VatRateSelect from "@components/forms/VatRateSelect";

interface Props {}

const NewInvoice: React.FC<Props> = () => {
  const methods = useForm<InvoiceParams>({
    defaultValues: {
      dateOfIssue: today(),
      dateOfSale: today(),
      lineItems: [{ quantity: 1, description: "" }]
    }
  });
  const { register, control } = methods;
  const { fields, append } = useFieldArray({ control, name: "lineItems" });

  return (
    <Layout title="Issue an invoice">
      <FormWrapper {...methods}>
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
        <section className="mt-1">
          <h2 className="title is-4">Invoice entries</h2>
          {fields.map((field, number) => (
            <InputGroup key={field.id} columns={6}>
              <InputField
                colSpan={2}
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
            </InputGroup>
          ))}
        </section>
      </FormWrapper>
    </Layout>
  );
};

export default NewInvoice;
