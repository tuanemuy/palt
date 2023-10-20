import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getColumnStyle } from '../patterns/column.mjs';

export const Column = /* @__PURE__ */ forwardRef(function Column(props, ref) {
  const { grow, shrink, ...restProps } = props
const styleProps = getColumnStyle({grow, shrink})
return createElement(styled.div, { ref, ...styleProps, ...restProps })
})