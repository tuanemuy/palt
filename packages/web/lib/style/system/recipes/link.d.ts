/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface LinkVariant {
  
}

type LinkVariantMap = {
  [key in keyof LinkVariant]: Array<LinkVariant[key]>
}

export type LinkVariantProps = {
  [key in keyof LinkVariant]?: ConditionalValue<LinkVariant[key]>
}

export interface LinkRecipe {
  __type: LinkVariantProps
  (props?: LinkVariantProps): string
  raw: (props?: LinkVariantProps) => LinkVariantProps
  variantMap: LinkVariantMap
  variantKeys: Array<keyof LinkVariant>
  splitVariantProps<Props extends LinkVariantProps>(props: Props): [LinkVariantProps, Pretty<DistributiveOmit<Props, keyof LinkVariantProps>>]
}

/** Typography - Link style */
export declare const link: LinkRecipe