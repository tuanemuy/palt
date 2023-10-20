import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getBackgroundStyle } from '../patterns/background.mjs';

export const Background = /* @__PURE__ */ forwardRef(function Background(props, ref) {
  const styleProps = getBackgroundStyle()
return createElement(styled.div, { ref, ...styleProps, ...props })
})