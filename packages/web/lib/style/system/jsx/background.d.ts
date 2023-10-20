/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { BackgroundProperties } from '../patterns/background';
import type { HTMLStyledProps } from '../types/jsx';
import type { DistributiveOmit } from '../types/system-types';

export interface BackgroundProps extends BackgroundProperties, DistributiveOmit<HTMLStyledProps<'div'>, keyof BackgroundProperties > {}


export declare const Background: FunctionComponent<BackgroundProps>