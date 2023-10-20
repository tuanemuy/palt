import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getRowStyle } from '../patterns/row.mjs';

export const Row = /* @__PURE__ */ forwardRef(function Row(props, ref) {
  const styleProps = getRowStyle()
return createElement(styled.div, { ref, ...styleProps, ...props })
})