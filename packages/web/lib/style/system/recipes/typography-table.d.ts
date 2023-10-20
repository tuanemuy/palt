/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface TypographyTableVariant {
  
}

type TypographyTableVariantMap = {
  [key in keyof TypographyTableVariant]: Array<TypographyTableVariant[key]>
}

export type TypographyTableVariantProps = {
  [key in keyof TypographyTableVariant]?: ConditionalValue<TypographyTableVariant[key]>
}

export interface TypographyTableRecipe {
  __type: TypographyTableVariantProps
  (props?: TypographyTableVariantProps): string
  raw: (props?: TypographyTableVariantProps) => TypographyTableVariantProps
  variantMap: TypographyTableVariantMap
  variantKeys: Array<keyof TypographyTableVariant>
  splitVariantProps<Props extends TypographyTableVariantProps>(props: Props): [TypographyTableVariantProps, Pretty<DistributiveOmit<Props, keyof TypographyTableVariantProps>>]
}

/** Typography - table style */
export declare const typographyTable: TypographyTableRecipe