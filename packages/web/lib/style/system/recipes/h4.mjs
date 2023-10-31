import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const h4Fn = /* @__PURE__ */ createRecipe('h4', {}, [])

const h4VariantMap = {}

const h4VariantKeys = Object.keys(h4VariantMap)

export const h4 = /* @__PURE__ */ Object.assign(h4Fn, {
  __recipe__: true,
  __name__: 'h4',
  raw: (props) => props,
  variantKeys: h4VariantKeys,
  variantMap: h4VariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, h4VariantKeys)
  },
})