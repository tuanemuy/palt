import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const h2Fn = /* @__PURE__ */ createRecipe('h2', {}, [])

const h2VariantMap = {}

const h2VariantKeys = Object.keys(h2VariantMap)

export const h2 = /* @__PURE__ */ Object.assign(h2Fn, {
  __recipe__: true,
  __name__: 'h2',
  raw: (props) => props,
  variantKeys: h2VariantKeys,
  variantMap: h2VariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, h2VariantKeys)
  },
})