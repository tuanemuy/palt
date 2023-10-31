import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableFn = /* @__PURE__ */ createRecipe('table', {}, [])

const tableVariantMap = {}

const tableVariantKeys = Object.keys(tableVariantMap)

export const table = /* @__PURE__ */ Object.assign(tableFn, {
  __recipe__: true,
  __name__: 'table',
  raw: (props) => props,
  variantKeys: tableVariantKeys,
  variantMap: tableVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableVariantKeys)
  },
})