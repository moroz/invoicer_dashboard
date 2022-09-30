import { SignInMutationVariables, useSignInMutation } from "@api/mutations";
import { FormWrapper, InputField } from "@components/forms";
import { SubmitButton } from "@components/buttons";
import useAuth from "@hooks/useAuth";
import clsx from "clsx";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.sass";
import ReactHelmet from "react-helmet";
import { APP_NAME } from "@/config";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [mutate, { error }] = useSignInMutation();
  const methods = useForm<SignInMutationVariables>();
  const { register } = methods;
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const onSubmit = useCallback(async (data: SignInMutationVariables) => {
    const result = await mutate({ variables: data });
    if (result.data?.signIn.success) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.root}>
      <ReactHelmet>
        <title>Login | {APP_NAME}</title>
      </ReactHelmet>
      <div className={clsx("card", styles.card)}>
        <div className="card-content">
          <FormWrapper {...methods} onSubmit={onSubmit}>
            {error ? (
              <div className="notification is-warning">
                {JSON.stringify(error)}
              </div>
            ) : null}
            <h1 className="title is-4 has-text-centered">Sign in</h1>
            <InputField label="Email:" {...register("email")} autoFocus />
            <InputField
              label="Password:"
              type="password"
              {...register("password")}
            />
            <SubmitButton className="is-fullwidth" />
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
