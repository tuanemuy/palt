/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface TableRowVariant {
  
}

type TableRowVariantMap = {
  [key in keyof TableRowVariant]: Array<TableRowVariant[key]>
}

export type TableRowVariantProps = {
  [key in keyof TableRowVariant]?: ConditionalValue<TableRowVariant[key]>
}

export interface TableRowRecipe {
  __type: TableRowVariantProps
  (props?: TableRowVariantProps): string
  raw: (props?: TableRowVariantProps) => TableRowVariantProps
  variantMap: TableRowVariantMap
  variantKeys: Array<keyof TableRowVariant>
  splitVariantProps<Props extends TableRowVariantProps>(props: Props): [TableRowVariantProps, Pretty<DistributiveOmit<Props, keyof TableRowVariantProps>>]
}

/** Styles for the TableRow component */
export declare const tableRow: TableRowRecipe