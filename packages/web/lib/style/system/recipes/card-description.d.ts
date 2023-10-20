/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface CardDescriptionVariant {
  
}

type CardDescriptionVariantMap = {
  [key in keyof CardDescriptionVariant]: Array<CardDescriptionVariant[key]>
}

export type CardDescriptionVariantProps = {
  [key in keyof CardDescriptionVariant]?: ConditionalValue<CardDescriptionVariant[key]>
}

export interface CardDescriptionRecipe {
  __type: CardDescriptionVariantProps
  (props?: CardDescriptionVariantProps): string
  raw: (props?: CardDescriptionVariantProps) => CardDescriptionVariantProps
  variantMap: CardDescriptionVariantMap
  variantKeys: Array<keyof CardDescriptionVariant>
  splitVariantProps<Props extends CardDescriptionVariantProps>(props: Props): [CardDescriptionVariantProps, Pretty<DistributiveOmit<Props, keyof CardDescriptionVariantProps>>]
}

/** Styles for the CardDescription component */
export declare const cardDescription: CardDescriptionRecipe