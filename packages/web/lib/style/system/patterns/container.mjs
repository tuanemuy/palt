import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const containerConfig = {
transform(props) {
  return __spreadValues({
    position: "relative",
    w: "full",
    maxW: "l.250",
    marginX: "auto",
    px: {
      base: "s.200",
      md: "m.50",
      lg: "m.100"
    }
  }, props);
}}

export const getContainerStyle = (styles = {}) => containerConfig.transform(styles, { map: mapObject })

export const container = (styles) => css(getContainerStyle(styles))
container.raw = getContainerStyle