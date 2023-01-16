import {FormProvider, useForm} from "react-hook-form";

export const MockFormProvider = ({children}: {children: React.ReactNode}) => {
  const form = useForm();
  return <FormProvider {...form}>{children}</FormProvider>;
};
