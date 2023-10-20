import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const rowConfig = {
transform(props) {
  return __spreadValues({
    position: "relative",
    display: "flex",
    width: "100%"
  }, props);
}}

export const getRowStyle = (styles = {}) => rowConfig.transform(styles, { map: mapObject })

export const row = (styles) => css(getRowStyle(styles))
row.raw = getRowStyle