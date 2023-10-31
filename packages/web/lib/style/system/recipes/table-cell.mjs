import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableCellFn = /* @__PURE__ */ createRecipe('tableCell', {}, [])

const tableCellVariantMap = {}

const tableCellVariantKeys = Object.keys(tableCellVariantMap)

export const tableCell = /* @__PURE__ */ Object.assign(tableCellFn, {
  __recipe__: true,
  __name__: 'tableCell',
  raw: (props) => props,
  variantKeys: tableCellVariantKeys,
  variantMap: tableCellVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableCellVariantKeys)
  },
})