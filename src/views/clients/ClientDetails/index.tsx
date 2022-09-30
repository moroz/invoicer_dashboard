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

  return (
    <Layout
      title={client.name}
      subtitle={`Client details`}
      backUrl="/clients"
    >
      <div className="card">
        <div className="card-content">
          <p>
            <strong>VAT ID:</strong>
            <br />
            {client.vatId}
          </p>
          <section>
            <strong>Address:</strong>
            <p>
              {client.addressLine}
              <br />
              {client.postalCode} {client.city}
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetails;
