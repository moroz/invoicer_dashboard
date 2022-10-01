import React from "react";
import Layout from "@views/Layout";
import { FormWrapper, InputField, InputGroup } from "@components/forms";
import { useForm } from "react-hook-form";
import { InvoiceParams } from "@api/interfaces";
import { today } from "@/lib/dateHelpers";
import ClientFormFields from "@views/clients/FormFields";

interface Props {}

const NewInvoice: React.FC<Props> = () => {
  const methods = useForm<InvoiceParams>({
    defaultValues: {
      dateOfIssue: today(),
      dateOfSale: today()
    }
  });
  const { register } = methods;

  return (
    <Layout title="Issue an invoice">
      <FormWrapper {...methods}>
        <section>
          <InputGroup columns={4}>
            <InputField
              autoFocus
              label="Invoice no:"
              {...register("invoiceNo")}
            />
            <InputField
              type="date"
              label="Date of issue:"
              {...register("dateOfIssue")}
            />
            <InputField
              type="date"
              label="Date of sale:"
              {...register("dateOfSale")}
            />
            <InputField label="Place of issue:" {...register("placeOfIssue")} />
          </InputGroup>
        </section>
        <section className="columns mt-4">
          <div className="column">
            <h2 className="title is-4">Seller</h2>
            <ClientFormFields prefix="seller." />
          </div>
          <div className="column">
            <h2 className="title is-4">Buyer</h2>
            <ClientFormFields prefix="buyer." />
          </div>
        </section>
      </FormWrapper>
    </Layout>
  );
};

export default NewInvoice;
