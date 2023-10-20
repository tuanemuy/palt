/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface CollapsibleVariant {
  
}

type CollapsibleVariantMap = {
  [key in keyof CollapsibleVariant]: Array<CollapsibleVariant[key]>
}

export type CollapsibleVariantProps = {
  [key in keyof CollapsibleVariant]?: ConditionalValue<CollapsibleVariant[key]>
}

export interface CollapsibleRecipe {
  __type: CollapsibleVariantProps
  (props?: CollapsibleVariantProps): Pretty<Record<"root" | "trigger" | "content", string>>
  raw: (props?: CollapsibleVariantProps) => CollapsibleVariantProps
  variantMap: CollapsibleVariantMap
  variantKeys: Array<keyof CollapsibleVariant>
  splitVariantProps<Props extends CollapsibleVariantProps>(props: Props): [CollapsibleVariantProps, Pretty<DistributiveOmit<Props, keyof CollapsibleVariantProps>>]
}

/** Styles for the Collapsible component */
export declare const collapsible: CollapsibleRecipe