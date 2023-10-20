/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface TableHeadVariant {
  
}

type TableHeadVariantMap = {
  [key in keyof TableHeadVariant]: Array<TableHeadVariant[key]>
}

export type TableHeadVariantProps = {
  [key in keyof TableHeadVariant]?: ConditionalValue<TableHeadVariant[key]>
}

export interface TableHeadRecipe {
  __type: TableHeadVariantProps
  (props?: TableHeadVariantProps): string
  raw: (props?: TableHeadVariantProps) => TableHeadVariantProps
  variantMap: TableHeadVariantMap
  variantKeys: Array<keyof TableHeadVariant>
  splitVariantProps<Props extends TableHeadVariantProps>(props: Props): [TableHeadVariantProps, Pretty<DistributiveOmit<Props, keyof TableHeadVariantProps>>]
}

/** Styles for the TableHead component */
export declare const tableHead: TableHeadRecipe