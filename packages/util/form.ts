import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

export const valueAsString = {
  setValueAs: (value: any) => (value === "" ? undefined : value),
};

export const emptyAsUndefined = {
  setValueAs: (value: any) => (value === "" ? undefined : value),
};

export const emptyAsNull = {
  setValueAs: (value: any) => (value === "" ? null : value),
};

export * from "react-hook-form";
