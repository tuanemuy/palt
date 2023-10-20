/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface FormControlVariant {
  
}

type FormControlVariantMap = {
  [key in keyof FormControlVariant]: Array<FormControlVariant[key]>
}

export type FormControlVariantProps = {
  [key in keyof FormControlVariant]?: ConditionalValue<FormControlVariant[key]>
}

export interface FormControlRecipe {
  __type: FormControlVariantProps
  (props?: FormControlVariantProps): string
  raw: (props?: FormControlVariantProps) => FormControlVariantProps
  variantMap: FormControlVariantMap
  variantKeys: Array<keyof FormControlVariant>
  splitVariantProps<Props extends FormControlVariantProps>(props: Props): [FormControlVariantProps, Pretty<DistributiveOmit<Props, keyof FormControlVariantProps>>]
}

/** Styles for the FormControl component */
export declare const formControl: FormControlRecipe