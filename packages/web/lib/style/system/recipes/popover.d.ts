/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface PopoverVariant {
  
}

type PopoverVariantMap = {
  [key in keyof PopoverVariant]: Array<PopoverVariant[key]>
}

export type PopoverVariantProps = {
  [key in keyof PopoverVariant]?: ConditionalValue<PopoverVariant[key]>
}

export interface PopoverRecipe {
  __type: PopoverVariantProps
  (props?: PopoverVariantProps): Pretty<Record<"root" | "trigger" | "portal" | "content", string>>
  raw: (props?: PopoverVariantProps) => PopoverVariantProps
  variantMap: PopoverVariantMap
  variantKeys: Array<keyof PopoverVariant>
  splitVariantProps<Props extends PopoverVariantProps>(props: Props): [PopoverVariantProps, Pretty<DistributiveOmit<Props, keyof PopoverVariantProps>>]
}

/** Styles for the Popover component */
export declare const popover: PopoverRecipe