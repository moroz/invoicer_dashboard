import { SignUpParams } from "@api/interfaces";
import { SubmitButton } from "@components/buttons";
import { FormWrapper, InputField } from "@components/forms";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Layout from "../Layout";

interface Props {}

const SignUp: React.FC<Props> = () => {
  const methods = useForm<SignUpParams>();
  const { register, watch } = methods;

  const onSubmit = useCallback(async (params: SignUpParams) => {}, []);

  return (
    <Layout title="Sign up">
      <FormWrapper {...methods}>
        <h1 className="title is-4 has-text-centered">Sign up</h1>
        <p>
          Already have an account? <Link to="/sign-in">Sign in</Link>
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
          label="Choose a password:"
          helperText="Must contain at least 8 characters with at least 1 number and 1 uppercase letter"
          type="password"
          autoComplete="new-password"
          required
          {...register("password")}
        />
        <InputField
          label="Confirm password:"
          type="password"
          autoComplete="new-password"
          required
          {...register("password")}
        />
        <SubmitButton>Register</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default SignUp;
