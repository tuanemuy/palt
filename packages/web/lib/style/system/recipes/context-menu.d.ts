/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface ContextMenuVariant {
  inset: boolean
}

type ContextMenuVariantMap = {
  [key in keyof ContextMenuVariant]: Array<ContextMenuVariant[key]>
}

export type ContextMenuVariantProps = {
  [key in keyof ContextMenuVariant]?: ConditionalValue<ContextMenuVariant[key]>
}

export interface ContextMenuRecipe {
  __type: ContextMenuVariantProps
  (props?: ContextMenuVariantProps): Pretty<Record<"root" | "trigger" | "group" | "portal" | "sub" | "radioGroup" | "subTrigger" | "subContent" | "content" | "item" | "checkboxItem" | "radioItem" | "label" | "separator" | "shortcut" | "itemIndicator", string>>
  raw: (props?: ContextMenuVariantProps) => ContextMenuVariantProps
  variantMap: ContextMenuVariantMap
  variantKeys: Array<keyof ContextMenuVariant>
  splitVariantProps<Props extends ContextMenuVariantProps>(props: Props): [ContextMenuVariantProps, Pretty<DistributiveOmit<Props, keyof ContextMenuVariantProps>>]
}

/** Styles for the ContextMenu component */
export declare const contextMenu: ContextMenuRecipe