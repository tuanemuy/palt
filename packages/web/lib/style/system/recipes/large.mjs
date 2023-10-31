import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const largeFn = /* @__PURE__ */ createRecipe('large', {}, [])

const largeVariantMap = {}

const largeVariantKeys = Object.keys(largeVariantMap)

export const large = /* @__PURE__ */ Object.assign(largeFn, {
  __recipe__: true,
  __name__: 'large',
  raw: (props) => props,
  variantKeys: largeVariantKeys,
  variantMap: largeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, largeVariantKeys)
  },
})