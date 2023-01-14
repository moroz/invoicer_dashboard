import React, { useCallback } from "react";
import Layout from "@views/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInvoiceQuery } from "@api/queries";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import { API_BASE_URL } from "@api/client";
import {
  ButtonGroup,
  DeleteButton,
  DownloadButton,
  EditButton,
  PDFButton
} from "@components/buttons";
import { useDeleteInvoiceMutation } from "@api/mutations";

interface Props {}

export const sanitizeFileName = (filename: string) => {
  return filename.replace(/[\/\\\"\'\$\^\*]+/g, "-");
};

export const CONFIRMATION_TEXT =
  "Are you sure you want to delete this invoice? This action cannot be undone!";

const InvoiceDetails: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetInvoiceQuery(id);
  const invoice = data?.invoice;
  const navigate = useNavigate();

  const [mutate] = useDeleteInvoiceMutation(id!);

  const onDelete = useCallback(async () => {
    if (!confirm(CONFIRMATION_TEXT)) return;

    const result = await mutate();
    if (result.data?.result.success) {
      navigate(`/invoices`);
    }
  }, [mutate]);

  if (loading) return <LayoutLoader />;
  if (!invoice) return <NotFound />;

  const pdfURL = `${API_BASE_URL}/invoices/${invoice.id}`;

  return (
    <Layout
      title={invoice.invoiceNo}
      subtitle="Invoice details"
      actions={
        <ButtonGroup>
          <DeleteButton onClick={onDelete} />
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
