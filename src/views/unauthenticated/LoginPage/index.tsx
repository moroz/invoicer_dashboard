import { SignInMutationVariables, useSignInMutation } from "@api/mutations";
import { FormWrapper, InputField } from "@components/forms";
import { SubmitButton } from "@components/buttons";
import clsx from "clsx";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.sass";
import Layout from "../Layout";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [mutate, { error }] = useSignInMutation();
  const methods = useForm<SignInMutationVariables>();
  const { register } = methods;
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: SignInMutationVariables) => {
    const result = await mutate({ variables: data });
    if (result.data?.signIn.success) {
      navigate("/");
    }
  }, []);

  return (
    <Layout title="Login">
      <FormWrapper {...methods} onSubmit={onSubmit}>
        {error ? (
          <div className="notification is-warning">{JSON.stringify(error)}</div>
        ) : null}
        <h1 className="title is-4 has-text-centered">Sign in</h1>
        <p>
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
        <InputField
          label="Email:"
          {...register("email")}
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="email"
          spellCheck={false}
          required
        />
        <InputField
          label="Password:"
          type="password"
          autoComplete="password"
          required
          {...register("password")}
        />
        <SubmitButton className="is-fullwidth">Sign in</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default LoginPage;
