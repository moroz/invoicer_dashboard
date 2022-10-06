import React, { useCallback, useEffect } from "react";
import Layout from "@views/Layout";
import { useGetInvoiceQuery } from "@api/queries";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import { useForm } from "react-hook-form";
import { InvoiceParams } from "@api/interfaces";
import { FormWrapper } from "@components/forms";
import FormFields from "../FormFields";
import { useUpdateInvoiceMutation } from "@api/mutations";
import { setFormErrors } from "@/lib/formHelpers";
import { SubmitButton } from "@components/buttons";
import { omit } from "@/lib/fakeLodash";

interface Props {}

const OMIT_KEYS = [
  "__typename",
  "id",
  "insertedAt",
  "updatedAt",
  "buyerId",
  "sellerId"
];

const EditInvoice: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetInvoiceQuery(id);
  const invoice = data?.invoice;
  const navigate = useNavigate();

  const [mutate] = useUpdateInvoiceMutation();

  const methods = useForm<InvoiceParams>();
  const { reset, setError } = methods;

  useEffect(() => {
    if (invoice) reset(invoice);
  }, [invoice]);

  const onSubmit = useCallback(
    async (rawParams: InvoiceParams) => {
      const { seller, buyer, lineItems, ...rest } = rawParams;
      const params = {
        ...omit(rest, OMIT_KEYS),
        seller: omit(seller, OMIT_KEYS),
        buyer: omit(buyer, OMIT_KEYS),
        lineItems: lineItems.map((item) => omit(item, OMIT_KEYS))
      };
      const result = await mutate({ variables: { id: id!, params } });
      if (result.data?.result.success) {
        navigate(`/invoices/${id}`);
      } else {
        setFormErrors(setError, result.data?.result.errors);
      }
    },
    [mutate, id]
  );

  if (loading) return <LayoutLoader />;
  if (!invoice) return <NotFound />;

  return (
    <Layout
      title={`Edit invoice ${invoice.invoiceNo}`}
      backUrl={`/invoices/${id}`}
    >
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <FormFields />
        <SubmitButton>Update invoice</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default EditInvoice;
