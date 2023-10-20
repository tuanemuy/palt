/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface ToastViewportVariant {
  
}

type ToastViewportVariantMap = {
  [key in keyof ToastViewportVariant]: Array<ToastViewportVariant[key]>
}

export type ToastViewportVariantProps = {
  [key in keyof ToastViewportVariant]?: ConditionalValue<ToastViewportVariant[key]>
}

export interface ToastViewportRecipe {
  __type: ToastViewportVariantProps
  (props?: ToastViewportVariantProps): string
  raw: (props?: ToastViewportVariantProps) => ToastViewportVariantProps
  variantMap: ToastViewportVariantMap
  variantKeys: Array<keyof ToastViewportVariant>
  splitVariantProps<Props extends ToastViewportVariantProps>(props: Props): [ToastViewportVariantProps, Pretty<DistributiveOmit<Props, keyof ToastViewportVariantProps>>]
}

/** Styles for the ToastViewport component */
export declare const toastViewport: ToastViewportRecipe