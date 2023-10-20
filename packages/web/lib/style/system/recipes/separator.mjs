import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const separatorFn = /* @__PURE__ */ createRecipe('separator', {
  "orientation": "horizontal"
}, [])

const separatorVariantMap = {
  "orientation": [
    "horizontal",
    "vertical"
  ]
}

const separatorVariantKeys = Object.keys(separatorVariantMap)

export const separator = /* @__PURE__ */ Object.assign(separatorFn, {
  __recipe__: true,
  __name__: 'separator',
  raw: (props) => props,
  variantKeys: separatorVariantKeys,
  variantMap: separatorVariantMap,
  splitVariantProps(props) {
    return splitProps(props, separatorVariantKeys)
  },
})