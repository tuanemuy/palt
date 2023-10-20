/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface SheetVariant {
  side: "top" | "bottom" | "left" | "right"
}

type SheetVariantMap = {
  [key in keyof SheetVariant]: Array<SheetVariant[key]>
}

export type SheetVariantProps = {
  [key in keyof SheetVariant]?: ConditionalValue<SheetVariant[key]>
}

export interface SheetRecipe {
  __type: SheetVariantProps
  (props?: SheetVariantProps): Pretty<Record<"root" | "trigger" | "close" | "portal" | "overlay" | "header" | "footer" | "title" | "description" | "content" | "contentClose", string>>
  raw: (props?: SheetVariantProps) => SheetVariantProps
  variantMap: SheetVariantMap
  variantKeys: Array<keyof SheetVariant>
  splitVariantProps<Props extends SheetVariantProps>(props: Props): [SheetVariantProps, Pretty<DistributiveOmit<Props, keyof SheetVariantProps>>]
}

/** Styles for the Sheet component */
export declare const sheet: SheetRecipe