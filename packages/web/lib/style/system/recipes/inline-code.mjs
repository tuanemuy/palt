import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const inlineCodeFn = /* @__PURE__ */ createRecipe('inlineCode', {}, [])

const inlineCodeVariantMap = {}

const inlineCodeVariantKeys = Object.keys(inlineCodeVariantMap)

export const inlineCode = /* @__PURE__ */ Object.assign(inlineCodeFn, {
  __recipe__: true,
  __name__: 'inlineCode',
  raw: (props) => props,
  variantKeys: inlineCodeVariantKeys,
  variantMap: inlineCodeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, inlineCodeVariantKeys)
  },
})