/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface PVariant {
  
}

type PVariantMap = {
  [key in keyof PVariant]: Array<PVariant[key]>
}

export type PVariantProps = {
  [key in keyof PVariant]?: ConditionalValue<PVariant[key]>
}

export interface PRecipe {
  __type: PVariantProps
  (props?: PVariantProps): string
  raw: (props?: PVariantProps) => PVariantProps
  variantMap: PVariantMap
  variantKeys: Array<keyof PVariant>
  splitVariantProps<Props extends PVariantProps>(props: Props): [PVariantProps, Pretty<DistributiveOmit<Props, keyof PVariantProps>>]
}

/** Typography - p style */
export declare const p: PRecipe