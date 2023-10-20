import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const boxConfig = {
transform(props) {
  return __spreadValues({
    position: "relative"
  }, props);
}}

export const getBoxStyle = (styles = {}) => boxConfig.transform(styles, { map: mapObject })

export const box = (styles) => css(getBoxStyle(styles))
box.raw = getBoxStyle