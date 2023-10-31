import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableFooterFn = /* @__PURE__ */ createRecipe('tableFooter', {}, [])

const tableFooterVariantMap = {}

const tableFooterVariantKeys = Object.keys(tableFooterVariantMap)

export const tableFooter = /* @__PURE__ */ Object.assign(tableFooterFn, {
  __recipe__: true,
  __name__: 'tableFooter',
  raw: (props) => props,
  variantKeys: tableFooterVariantKeys,
  variantMap: tableFooterVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableFooterVariantKeys)
  },
})