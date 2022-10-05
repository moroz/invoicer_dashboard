import { setFormErrors } from "@/lib/formHelpers";
import { SignUpParams } from "@api/interfaces";
import { useSignUpMutation } from "@api/mutations";
import { SubmitButton } from "@components/buttons";
import { FormWrapper, InputField } from "@components/forms";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";

interface Props {}

const SignUp: React.FC<Props> = () => {
  const methods = useForm<SignUpParams>();
  const { register, setError } = methods;
  const [mutate] = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (params: SignUpParams) => {
    const result = await mutate({ variables: { params } });
    if (result.data?.result.success) {
      navigate("/sign-in");
    } else {
      setFormErrors(setError, result.data?.result.errors);
    }
  }, []);

  return (
    <Layout title="Sign up">
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <h1 className="title is-4 has-text-centered">Sign up</h1>
        <p>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
        <InputField
          label="Email:"
          {...register("email", { required: true })}
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
          {...register("password", { required: true })}
        />
        <InputField
          label="Confirm password:"
          type="password"
          autoComplete="new-password"
          required
          {...register("passwordConfirmation", { required: true })}
        />
        <SubmitButton>Register</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default SignUp;
