/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface CardContentVariant {
  
}

type CardContentVariantMap = {
  [key in keyof CardContentVariant]: Array<CardContentVariant[key]>
}

export type CardContentVariantProps = {
  [key in keyof CardContentVariant]?: ConditionalValue<CardContentVariant[key]>
}

export interface CardContentRecipe {
  __type: CardContentVariantProps
  (props?: CardContentVariantProps): string
  raw: (props?: CardContentVariantProps) => CardContentVariantProps
  variantMap: CardContentVariantMap
  variantKeys: Array<keyof CardContentVariant>
  splitVariantProps<Props extends CardContentVariantProps>(props: Props): [CardContentVariantProps, Pretty<DistributiveOmit<Props, keyof CardContentVariantProps>>]
}

/** Styles for the CardContent component */
export declare const cardContent: CardContentRecipe