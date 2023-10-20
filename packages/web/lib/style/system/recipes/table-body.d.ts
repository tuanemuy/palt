/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { Pretty } from '../types/helpers';
import type { DistributiveOmit } from '../types/system-types';

interface TableBodyVariant {
  
}

type TableBodyVariantMap = {
  [key in keyof TableBodyVariant]: Array<TableBodyVariant[key]>
}

export type TableBodyVariantProps = {
  [key in keyof TableBodyVariant]?: ConditionalValue<TableBodyVariant[key]>
}

export interface TableBodyRecipe {
  __type: TableBodyVariantProps
  (props?: TableBodyVariantProps): string
  raw: (props?: TableBodyVariantProps) => TableBodyVariantProps
  variantMap: TableBodyVariantMap
  variantKeys: Array<keyof TableBodyVariant>
  splitVariantProps<Props extends TableBodyVariantProps>(props: Props): [TableBodyVariantProps, Pretty<DistributiveOmit<Props, keyof TableBodyVariantProps>>]
}

/** Styles for the TableBody component */
export declare const tableBody: TableBodyRecipe