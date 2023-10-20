/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface TableFooterVariant {
  
}

type TableFooterVariantMap = {
  [key in keyof TableFooterVariant]: Array<TableFooterVariant[key]>
}

export type TableFooterVariantProps = {
  [key in keyof TableFooterVariant]?: ConditionalValue<TableFooterVariant[key]>
}

export interface TableFooterRecipe {
  __type: TableFooterVariantProps
  (props?: TableFooterVariantProps): string
  raw: (props?: TableFooterVariantProps) => TableFooterVariantProps
  variantMap: TableFooterVariantMap
  variantKeys: Array<keyof TableFooterVariant>
  splitVariantProps<Props extends TableFooterVariantProps>(props: Props): [TableFooterVariantProps, Pretty<DistributiveOmit<Props, keyof TableFooterVariantProps>>]
}

/** Styles for the TableFooter component */
export declare const tableFooter: TableFooterRecipe