import React, { useCallback, useEffect } from "react";
import Layout from "@views/Layout";
import { FormWrapper } from "@components/forms";
import { useForm } from "react-hook-form";
import { InvoiceParams, LineItemParams, LocaleTuple } from "@api/interfaces";
import { today } from "@/lib/dateHelpers";
import { SubmitButton } from "@components/buttons";
import { useCreateInvoiceMutation } from "@api/mutations";
import { useNavigate } from "react-router-dom";
import { setFormErrors } from "@/lib/formHelpers";
import FormFields from "../FormFields";
import { getLastWorkingDate } from "@api/nbpClient";

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
      lineItems: [EMPTY_LINE_ITEM],
      exchangeRateEffectiveDate: getLastWorkingDate(today())
    }
  });
  const { setError } = methods;
  const [mutate] = useCreateInvoiceMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (rawParams: InvoiceParams) => {
      const params = { ...rawParams };
      delete params.exchangeRateEffectiveDate;
      params.locale = params.locale.filter(Boolean) as LocaleTuple;
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
    <Layout title="Issue an invoice" backUrl="/invoices">
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <FormFields />
        <SubmitButton>Save invoice</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default NewInvoice;
