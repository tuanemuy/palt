/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface ListVariant {
  
}

type ListVariantMap = {
  [key in keyof ListVariant]: Array<ListVariant[key]>
}

export type ListVariantProps = {
  [key in keyof ListVariant]?: ConditionalValue<ListVariant[key]>
}

export interface ListRecipe {
  __type: ListVariantProps
  (props?: ListVariantProps): string
  raw: (props?: ListVariantProps) => ListVariantProps
  variantMap: ListVariantMap
  variantKeys: Array<keyof ListVariant>
  splitVariantProps<Props extends ListVariantProps>(props: Props): [ListVariantProps, Pretty<DistributiveOmit<Props, keyof ListVariantProps>>]
}

/** Typography - list style */
export declare const list: ListRecipe