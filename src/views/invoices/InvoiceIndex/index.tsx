import React, { useCallback } from "react";
import Layout from "@views/Layout";
import DataTable from "@components/DataTable";
import { Invoice } from "@api/interfaces";
import { usePaginateInvoicesQuery } from "@api/queries";
import useParsedQuery from "@hooks/useParsedQuery";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, RefetchButton, NewButton } from "@components/buttons";
import formatPrice from "@/lib/formatPrice";
import Pagination from "@components/Pagination";

interface Props {}

const InvoiceIndex: React.FC<Props> = () => {
  const [{ page, q }] = useParsedQuery();
  const { data, refetch } = usePaginateInvoicesQuery({
    page,
    q
  });
  const pageInfo = data?.result.pageInfo;
  const entries = data?.result.data;
  const navigate = useNavigate();

  const goTo = useCallback(
    (invoice: Invoice) => () => navigate(`/invoices/${invoice.id}`),
    [navigate]
  );

  return (
    <Layout
      title="Invoices"
      actions={
        <ButtonGroup>
          <RefetchButton onClick={() => refetch()} />
          <NewButton to="/invoices/new" />
        </ButtonGroup>
      }
    >
      <DataTable clickable>
        <thead>
          <tr>
            <th>Invoice number</th>
            <th>Buyer</th>
            <th>Gross total</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((invoice) => (
            <tr key={invoice.id} onClick={goTo(invoice)}>
              <td>{invoice.invoiceNo}</td>
              <td>
                {invoice.buyer.name}
                {invoice.buyer.vatId && ` (${invoice.buyer.vatId})`}
              </td>
              <td>{formatPrice(invoice.grossTotal, invoice.currency)}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
      <Pagination pageInfo={pageInfo} />
    </Layout>
  );
};

export default InvoiceIndex;
