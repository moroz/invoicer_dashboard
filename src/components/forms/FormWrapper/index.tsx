import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn
} from "react-hook-form";

type Props<T extends FieldValues> = UseFormReturn<T> & {
  onSubmit?: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

const FormWrapper = <T extends FieldValues>({
  onSubmit,
  children,
  className,
  ...rest
}: Props<T>) => {
  return (
    <FormProvider {...rest}>
      <form
        onSubmit={onSubmit && rest.handleSubmit(onSubmit)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
