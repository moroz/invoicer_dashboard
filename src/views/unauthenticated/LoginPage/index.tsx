import { SignInMutationVariables } from "@api/mutations/sessionMutations";
import FormWrapper from "@components/FormWrapper";
import InputField from "@components/InputField";
import SubmitButton from "@components/SubmitButton";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.sass";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const methods = useForm<SignInMutationVariables>();
  const { register } = methods;
  return (
    <div className={styles.root}>
      <div className={clsx("card", styles.card)}>
        <div className="card-content">
          <FormWrapper {...methods}>
            <h1 className="title is-4 has-text-centered">Sign in</h1>
            <InputField label="Email:" {...register("email")} autoFocus />
            <InputField label="Password:" {...register("password")} />
            <SubmitButton className="is-fullwidth" />
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
