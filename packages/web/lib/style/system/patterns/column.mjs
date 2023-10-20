import { mapObject, __spreadValues, __objRest } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const columnConfig = {
transform(props) {
  const _a = props, { grow, shrink } = _a, rest = __objRest(_a, ["grow", "shrink"]);
  return __spreadValues({
    position: "relative",
    flexGrow: grow || 0,
    flexShrink: shrink || 0,
    maxWidth: "100%",
    "& > *": {
      width: "100%",
      height: "100%"
    }
  }, rest);
}}

export const getColumnStyle = (styles = {}) => columnConfig.transform(styles, { map: mapObject })

export const column = (styles) => css(getColumnStyle(styles))
column.raw = getColumnStyle