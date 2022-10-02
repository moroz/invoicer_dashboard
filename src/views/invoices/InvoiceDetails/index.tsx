import React from "react";
import Layout from "@views/Layout";
import { useParams } from "react-router-dom";
import { useGetInvoiceQuery } from "@api/queries";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import { API_BASE_URL } from "@api/client";

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
      actions={
        <a
          href={`${API_BASE_URL}/invoices/${invoice.id}`}
          target="_blank"
          className="button"
        >
          PDF
        </a>
      }
      backUrl="/invoices"
    ></Layout>
  );
};

export default InvoiceDetails;
