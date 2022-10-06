import React from "react";
import Layout from "@views/Layout";
import { useParams } from "react-router-dom";
import { useGetInvoiceQuery } from "@api/queries";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import { API_BASE_URL } from "@api/client";
import {
  ButtonGroup,
  DownloadButton,
  EditButton,
  PDFButton
} from "@components/buttons";

interface Props {}

export const sanitizeFileName = (filename: string) => {
  return filename.replace(/[\/\\\"\'\$\^\*]+/g, "-");
};

const InvoiceDetails: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetInvoiceQuery(id);
  const invoice = data?.invoice;

  if (loading) return <LayoutLoader />;
  if (!invoice) return <NotFound />;

  const pdfURL = `${API_BASE_URL}/invoices/${invoice.id}`;

  return (
    <Layout
      title={invoice.invoiceNo}
      subtitle="Invoice details"
      actions={
        <ButtonGroup>
          <EditButton to={`/invoices/${id}/edit`} />
          <PDFButton to={pdfURL} target="_blank" />
          <DownloadButton to={pdfURL + "?download=true"} />
        </ButtonGroup>
      }
      backUrl="/invoices"
    ></Layout>
  );
};

export default InvoiceDetails;
