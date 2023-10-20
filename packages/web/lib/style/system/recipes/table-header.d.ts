/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface TableHeaderVariant {
  
}

type TableHeaderVariantMap = {
  [key in keyof TableHeaderVariant]: Array<TableHeaderVariant[key]>
}

export type TableHeaderVariantProps = {
  [key in keyof TableHeaderVariant]?: ConditionalValue<TableHeaderVariant[key]>
}

export interface TableHeaderRecipe {
  __type: TableHeaderVariantProps
  (props?: TableHeaderVariantProps): string
  raw: (props?: TableHeaderVariantProps) => TableHeaderVariantProps
  variantMap: TableHeaderVariantMap
  variantKeys: Array<keyof TableHeaderVariant>
  splitVariantProps<Props extends TableHeaderVariantProps>(props: Props): [TableHeaderVariantProps, Pretty<DistributiveOmit<Props, keyof TableHeaderVariantProps>>]
}

/** Styles for the TableHeader component */
export declare const tableHeader: TableHeaderRecipe