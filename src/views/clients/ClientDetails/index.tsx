import React from "react";
import Layout from "@views/Layout";
import { useParams } from "react-router-dom";
import { useGetClientQuery } from "@api/queries";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";

interface Props {}

const ClientDetails: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetClientQuery(id);
  const client = data?.client;
  if (loading) return <LayoutLoader />;
  if (!client) return <NotFound />;

  const hasAddress = [client.addressLine, client.city, client.postalCode].some(
    Boolean
  );

  const hasBankInfo = [client.bankName, client.accountNo, client.bicCode].some(
    Boolean
  );

  return (
    <Layout title={client.name} subtitle={`Client details`} backUrl="/clients">
      <div className="card">
        <div className="card-content">
          <p>
            <strong>VAT ID:</strong> {client.vatId}
          </p>
          {hasAddress && (
            <>
              <strong>Address:</strong>
              <p>
                {client.addressLine}
                <br />
                {client.city}, {client.postalCode}
              </p>
            </>
          )}
          {hasBankInfo && (
            <>
              <strong>Bank info:</strong>
              <p>
                {client.bankName ? (
                  <>
                    <strong>Bank: </strong>
                    {client.bankName}
                    <br />
                  </>
                ) : (
                  ""
                )}
                {client.accountNo ? (
                  <>
                    <strong>Account number: </strong>
                    {client.accountNo}
                    <br />
                  </>
                ) : (
                  ""
                )}
                {client.bicCode ? (
                  <>
                    <strong>BIC/SWIFT code: </strong>
                    {client.bicCode}
                    <br />
                  </>
                ) : (
                  ""
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetails;
