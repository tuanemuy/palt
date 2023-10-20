/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface InlineCodeVariant {
  
}

type InlineCodeVariantMap = {
  [key in keyof InlineCodeVariant]: Array<InlineCodeVariant[key]>
}

export type InlineCodeVariantProps = {
  [key in keyof InlineCodeVariant]?: ConditionalValue<InlineCodeVariant[key]>
}

export interface InlineCodeRecipe {
  __type: InlineCodeVariantProps
  (props?: InlineCodeVariantProps): string
  raw: (props?: InlineCodeVariantProps) => InlineCodeVariantProps
  variantMap: InlineCodeVariantMap
  variantKeys: Array<keyof InlineCodeVariant>
  splitVariantProps<Props extends InlineCodeVariantProps>(props: Props): [InlineCodeVariantProps, Pretty<DistributiveOmit<Props, keyof InlineCodeVariantProps>>]
}

/** Typography - InlineCode style */
export declare const inlineCode: InlineCodeRecipe