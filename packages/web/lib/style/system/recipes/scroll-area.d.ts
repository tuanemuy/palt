/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface ScrollAreaVariant {
  
}

type ScrollAreaVariantMap = {
  [key in keyof ScrollAreaVariant]: Array<ScrollAreaVariant[key]>
}

export type ScrollAreaVariantProps = {
  [key in keyof ScrollAreaVariant]?: ConditionalValue<ScrollAreaVariant[key]>
}

export interface ScrollAreaRecipe {
  __type: ScrollAreaVariantProps
  (props?: ScrollAreaVariantProps): Pretty<Record<"root" | "viewport" | "corner" | "scrollbar" | "thumb", string>>
  raw: (props?: ScrollAreaVariantProps) => ScrollAreaVariantProps
  variantMap: ScrollAreaVariantMap
  variantKeys: Array<keyof ScrollAreaVariant>
  splitVariantProps<Props extends ScrollAreaVariantProps>(props: Props): [ScrollAreaVariantProps, Pretty<DistributiveOmit<Props, keyof ScrollAreaVariantProps>>]
}

/** Styles for the ScrollArea component */
export declare const scrollArea: ScrollAreaRecipe