import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableCaptionFn = /* @__PURE__ */ createRecipe('tableCaption', {}, [])

const tableCaptionVariantMap = {}

const tableCaptionVariantKeys = Object.keys(tableCaptionVariantMap)

export const tableCaption = /* @__PURE__ */ Object.assign(tableCaptionFn, {
  __recipe__: true,
  __name__: 'tableCaption',
  raw: (props) => props,
  variantKeys: tableCaptionVariantKeys,
  variantMap: tableCaptionVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableCaptionVariantKeys)
  },
})