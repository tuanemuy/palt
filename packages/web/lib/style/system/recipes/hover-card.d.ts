/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface HoverCardVariant {
  
}

type HoverCardVariantMap = {
  [key in keyof HoverCardVariant]: Array<HoverCardVariant[key]>
}

export type HoverCardVariantProps = {
  [key in keyof HoverCardVariant]?: ConditionalValue<HoverCardVariant[key]>
}

export interface HoverCardRecipe {
  __type: HoverCardVariantProps
  (props?: HoverCardVariantProps): Pretty<Record<"root" | "trigger" | "content", string>>
  raw: (props?: HoverCardVariantProps) => HoverCardVariantProps
  variantMap: HoverCardVariantMap
  variantKeys: Array<keyof HoverCardVariant>
  splitVariantProps<Props extends HoverCardVariantProps>(props: Props): [HoverCardVariantProps, Pretty<DistributiveOmit<Props, keyof HoverCardVariantProps>>]
}

/** Styles for the HoverCard component */
export declare const hoverCard: HoverCardRecipe