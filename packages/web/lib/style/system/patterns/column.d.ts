/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index';
import type { Properties } from '../types/csstype';
import type { PropertyValue } from '../types/prop-type';
import type { DistributiveOmit } from '../types/system-types';
import type { Tokens } from '../tokens/index';

export interface ColumnProperties {
   grow?: ConditionalValue<number>
	shrink?: ConditionalValue<number>
}


interface ColumnStyles extends ColumnProperties, DistributiveOmit<SystemStyleObject, keyof ColumnProperties > {}

interface ColumnPatternFn {
  (styles?: ColumnStyles): string
  raw: (styles?: ColumnStyles) => SystemStyleObject
}


export declare const column: ColumnPatternFn;
