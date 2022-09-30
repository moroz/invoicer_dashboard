import React, { useCallback } from "react";
import Layout from "@views/Layout";
import useParsedQuery from "@hooks/useParsedQuery";
import { usePaginateClientsQuery } from "@api/queries";
import Pagination from "@components/Pagination";
import DataTable from "@components/DataTable";
import { NewButton, RefetchButton, ButtonGroup } from "@components/buttons";
import { Client } from "@api/interfaces";
import { useNavigate } from "react-router-dom";

interface Props {}

const ClientIndex: React.FC<Props> = () => {
  const [{ page, q }] = useParsedQuery();
  const { data, refetch } = usePaginateClientsQuery({
    page,
    q
  });
  const pageInfo = data?.result.pageInfo;
  const entries = data?.result.data;
  const navigate = useNavigate();

  const goTo = useCallback(
    (client: Client) => () => navigate(`/clients/${client.id}`),
    [navigate]
  );

  return (
    <Layout
      title="Clients"
      actions={
        <ButtonGroup>
          <RefetchButton onClick={() => refetch()} />
          <NewButton to="/clients/new" />
        </ButtonGroup>
      }
    >
      {data ? (
        <>
          <DataTable clickable>
            <thead>
              <tr>
                <th>Name</th>
                <th>VAT ID</th>
              </tr>
            </thead>
            <tbody>
              {entries?.map((client) => (
                <tr key={client.id} onClick={goTo(client)}>
                  <td>{client.name}</td>
                  <td>{client.vatId}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
          <Pagination pageInfo={pageInfo} />
        </>
      ) : null}
    </Layout>
  );
};

export default ClientIndex;
