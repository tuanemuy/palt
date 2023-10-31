import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const h3Fn = /* @__PURE__ */ createRecipe('h3', {}, [])

const h3VariantMap = {}

const h3VariantKeys = Object.keys(h3VariantMap)

export const h3 = /* @__PURE__ */ Object.assign(h3Fn, {
  __recipe__: true,
  __name__: 'h3',
  raw: (props) => props,
  variantKeys: h3VariantKeys,
  variantMap: h3VariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, h3VariantKeys)
  },
})