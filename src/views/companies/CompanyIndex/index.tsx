import React, { useCallback } from "react";
import Layout from "@views/Layout";
import useParsedQuery from "@hooks/useParsedQuery";
import { usePaginateCompaniesQuery } from "@api/queries";
import Pagination from "@components/Pagination";
import DataTable from "@components/DataTable";
import { RefetchButton } from "@components/buttons";
import { Company } from "@api/interfaces";
import { useNavigate } from "react-router-dom";

interface Props {}

const CompanyIndex: React.FC<Props> = () => {
  const [{ page, q }] = useParsedQuery();
  const { data, refetch } = usePaginateCompaniesQuery({
    page,
    q
  });
  const pageInfo = data?.result.pageInfo;
  const entries = data?.result.data;
  const navigate = useNavigate();

  const goTo = useCallback(
    (company: Company) => () => navigate(`/companies/${company.id}`),
    [navigate]
  );

  return (
    <Layout
      title="Companies"
      actions={<RefetchButton onClick={() => refetch()} />}
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
              {entries?.map((company) => (
                <tr key={company.id} onClick={goTo(company)}>
                  <td>{company.name}</td>
                  <td>{company.vatId}</td>
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

export default CompanyIndex;
