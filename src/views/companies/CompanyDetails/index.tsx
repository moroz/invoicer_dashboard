import React from "react";
import Layout from "@views/Layout";
import { useParams } from "react-router-dom";
import { useGetCompanyQuery } from "@api/queries";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";

interface Props {}

const CompanyDetails: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetCompanyQuery(id);
  const company = data?.company;
  if (loading) return <LayoutLoader />;
  if (!company) return <NotFound />;

  return (
    <Layout
      title={company.name}
      subtitle={`Company details`}
      backUrl="/companies"
    >
      <div className="card">
        <div className="card-content">
          <p>
            <strong>VAT ID:</strong>
            <br />
            {company.vatId}
          </p>
          <section>
            <strong>Address:</strong>
            <p>
              {company.addressLine}
              <br />
              {company.postalCode} {company.city}
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyDetails;
