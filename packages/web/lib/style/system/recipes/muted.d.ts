/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface MutedVariant {
  
}

type MutedVariantMap = {
  [key in keyof MutedVariant]: Array<MutedVariant[key]>
}

export type MutedVariantProps = {
  [key in keyof MutedVariant]?: ConditionalValue<MutedVariant[key]>
}

export interface MutedRecipe {
  __type: MutedVariantProps
  (props?: MutedVariantProps): string
  raw: (props?: MutedVariantProps) => MutedVariantProps
  variantMap: MutedVariantMap
  variantKeys: Array<keyof MutedVariant>
  splitVariantProps<Props extends MutedVariantProps>(props: Props): [MutedVariantProps, Pretty<DistributiveOmit<Props, keyof MutedVariantProps>>]
}

/** Typography - Muted style */
export declare const muted: MutedRecipe