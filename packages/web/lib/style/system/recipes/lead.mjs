import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const leadFn = /* @__PURE__ */ createRecipe('lead', {}, [])

const leadVariantMap = {}

const leadVariantKeys = Object.keys(leadVariantMap)

export const lead = /* @__PURE__ */ Object.assign(leadFn, {
  __recipe__: true,
  __name__: 'lead',
  raw: (props) => props,
  variantKeys: leadVariantKeys,
  variantMap: leadVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, leadVariantKeys)
  },
})