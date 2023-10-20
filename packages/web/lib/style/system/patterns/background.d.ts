/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index';
import type { Properties } from '../types/csstype';
import type { PropertyValue } from '../types/prop-type';
import type { DistributiveOmit } from '../types/system-types';
import type { Tokens } from '../tokens/index';

export interface BackgroundProperties {
   
}


interface BackgroundStyles extends BackgroundProperties, DistributiveOmit<SystemStyleObject, keyof BackgroundProperties > {}

interface BackgroundPatternFn {
  (styles?: BackgroundStyles): string
  raw: (styles?: BackgroundStyles) => SystemStyleObject
}


export declare const background: BackgroundPatternFn;
