import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const pFn = /* @__PURE__ */ createRecipe('p', {}, [])

const pVariantMap = {}

const pVariantKeys = Object.keys(pVariantMap)

export const p = /* @__PURE__ */ Object.assign(pFn, {
  __recipe__: true,
  __name__: 'p',
  raw: (props) => props,
  variantKeys: pVariantKeys,
  variantMap: pVariantMap,
  splitVariantProps(props) {
    return splitProps(props, pVariantKeys)
  },
})