import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const listFn = /* @__PURE__ */ createRecipe('list', {}, [])

const listVariantMap = {}

const listVariantKeys = Object.keys(listVariantMap)

export const list = /* @__PURE__ */ Object.assign(listFn, {
  __recipe__: true,
  __name__: 'list',
  raw: (props) => props,
  variantKeys: listVariantKeys,
  variantMap: listVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, listVariantKeys)
  },
})