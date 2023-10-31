import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableHeadFn = /* @__PURE__ */ createRecipe('tableHead', {}, [])

const tableHeadVariantMap = {}

const tableHeadVariantKeys = Object.keys(tableHeadVariantMap)

export const tableHead = /* @__PURE__ */ Object.assign(tableHeadFn, {
  __recipe__: true,
  __name__: 'tableHead',
  raw: (props) => props,
  variantKeys: tableHeadVariantKeys,
  variantMap: tableHeadVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableHeadVariantKeys)
  },
})