/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index';
import type { Properties } from '../types/csstype';
import type { PropertyValue } from '../types/prop-type';
import type { DistributiveOmit } from '../types/system-types';
import type { Tokens } from '../tokens/index';

export interface RowProperties {
   
}


interface RowStyles extends RowProperties, DistributiveOmit<SystemStyleObject, keyof RowProperties > {}

interface RowPatternFn {
  (styles?: RowStyles): string
  raw: (styles?: RowStyles) => SystemStyleObject
}


export declare const row: RowPatternFn;
