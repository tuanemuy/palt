/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface SliderVariant {
  
}

type SliderVariantMap = {
  [key in keyof SliderVariant]: Array<SliderVariant[key]>
}

export type SliderVariantProps = {
  [key in keyof SliderVariant]?: ConditionalValue<SliderVariant[key]>
}

export interface SliderRecipe {
  __type: SliderVariantProps
  (props?: SliderVariantProps): Pretty<Record<"root" | "track" | "range" | "thumb", string>>
  raw: (props?: SliderVariantProps) => SliderVariantProps
  variantMap: SliderVariantMap
  variantKeys: Array<keyof SliderVariant>
  splitVariantProps<Props extends SliderVariantProps>(props: Props): [SliderVariantProps, Pretty<DistributiveOmit<Props, keyof SliderVariantProps>>]
}

/** Styles for the Slider component */
export declare const slider: SliderRecipe