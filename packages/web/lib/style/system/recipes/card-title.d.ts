/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface CardTitleVariant {
  
}

type CardTitleVariantMap = {
  [key in keyof CardTitleVariant]: Array<CardTitleVariant[key]>
}

export type CardTitleVariantProps = {
  [key in keyof CardTitleVariant]?: ConditionalValue<CardTitleVariant[key]>
}

export interface CardTitleRecipe {
  __type: CardTitleVariantProps
  (props?: CardTitleVariantProps): string
  raw: (props?: CardTitleVariantProps) => CardTitleVariantProps
  variantMap: CardTitleVariantMap
  variantKeys: Array<keyof CardTitleVariant>
  splitVariantProps<Props extends CardTitleVariantProps>(props: Props): [CardTitleVariantProps, Pretty<DistributiveOmit<Props, keyof CardTitleVariantProps>>]
}

/** Styles for the CardTitle component */
export declare const cardTitle: CardTitleRecipe