import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const h1Fn = /* @__PURE__ */ createRecipe('h1', {}, [])

const h1VariantMap = {}

const h1VariantKeys = Object.keys(h1VariantMap)

export const h1 = /* @__PURE__ */ Object.assign(h1Fn, {
  __recipe__: true,
  __name__: 'h1',
  raw: (props) => props,
  variantKeys: h1VariantKeys,
  variantMap: h1VariantMap,
  splitVariantProps(props) {
    return splitProps(props, h1VariantKeys)
  },
})