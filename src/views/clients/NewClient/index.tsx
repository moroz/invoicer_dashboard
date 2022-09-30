import React, { useCallback } from "react";
import Layout from "@views/Layout";
import { useForm } from "react-hook-form";
import { ClientParams } from "@api/interfaces";
import { FormWrapper } from "@components/forms";
import { SubmitButton } from "@components/buttons";
import { useCreateClientMutation } from "@api/mutations";
import { useNavigate } from "react-router-dom";
import { setFormErrors } from "@/lib/formHelpers";
import FormFields from "../FormFields";

interface Props {}

const NewClient: React.FC<Props> = () => {
  const methods = useForm<ClientParams>();
  const { setError } = methods;
  const [mutate] = useCreateClientMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (params: ClientParams) => {
      const res = await mutate({ variables: { params } });
      if (res.data?.result.success) {
        navigate(`/clients/${res.data.result.data.id}`);
      } else {
        setFormErrors(setError, res.data?.result.errors);
      }
    },
    [mutate]
  );

  return (
    <Layout title="New Client" backUrl="/clients">
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <FormFields />
        <SubmitButton>Create client</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default NewClient;
