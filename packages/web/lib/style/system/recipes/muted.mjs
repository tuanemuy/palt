import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const mutedFn = /* @__PURE__ */ createRecipe('muted', {}, [])

const mutedVariantMap = {}

const mutedVariantKeys = Object.keys(mutedVariantMap)

export const muted = /* @__PURE__ */ Object.assign(mutedFn, {
  __recipe__: true,
  __name__: 'muted',
  raw: (props) => props,
  variantKeys: mutedVariantKeys,
  variantMap: mutedVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, mutedVariantKeys)
  },
})