import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const backgroundConfig = {
transform(props) {
  return __spreadValues({
    position: "absolute",
    zIndex: "0",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "& > img": {
      width: "100%",
      objectFit: "cover",
      objectPosition: "50% 50%",
      verticalAlign: "middle"
    }
  }, props);
}}

export const getBackgroundStyle = (styles = {}) => backgroundConfig.transform(styles, { map: mapObject })

export const background = (styles) => css(getBackgroundStyle(styles))
background.raw = getBackgroundStyle