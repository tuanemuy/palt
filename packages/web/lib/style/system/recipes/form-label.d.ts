/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FormLabelVariant {
  
}

type FormLabelVariantMap = {
  [key in keyof FormLabelVariant]: Array<FormLabelVariant[key]>
}

export type FormLabelVariantProps = {
  [key in keyof FormLabelVariant]?: ConditionalValue<FormLabelVariant[key]>
}

export interface FormLabelRecipe {
  __type: FormLabelVariantProps
  (props?: FormLabelVariantProps): string
  raw: (props?: FormLabelVariantProps) => FormLabelVariantProps
  variantMap: FormLabelVariantMap
  variantKeys: Array<keyof FormLabelVariant>
  splitVariantProps<Props extends FormLabelVariantProps>(props: Props): [FormLabelVariantProps, Pretty<DistributiveOmit<Props, keyof FormLabelVariantProps>>]
}

/** Styles for the FormLabel component */
export declare const formLabel: FormLabelRecipe