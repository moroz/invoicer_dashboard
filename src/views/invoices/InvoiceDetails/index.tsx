import React from "react";
import Layout from "@views/Layout";
import { useParams } from "react-router-dom";
import { useGetInvoiceQuery } from "@api/queries";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";

interface Props {}

const InvoiceDetails: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetInvoiceQuery(id);
  const invoice = data?.invoice;

  if (loading) return <LayoutLoader />;
  if (!invoice) return <NotFound />;

  return (
    <Layout
      title={invoice.invoiceNo}
      subtitle="Invoice details"
      backUrl="/invoices"
    ></Layout>
  );
};

export default InvoiceDetails;
