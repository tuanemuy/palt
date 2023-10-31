import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const cardContentFn = /* @__PURE__ */ createRecipe('cardContent', {}, [])

const cardContentVariantMap = {}

const cardContentVariantKeys = Object.keys(cardContentVariantMap)

export const cardContent = /* @__PURE__ */ Object.assign(cardContentFn, {
  __recipe__: true,
  __name__: 'cardContent',
  raw: (props) => props,
  variantKeys: cardContentVariantKeys,
  variantMap: cardContentVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, cardContentVariantKeys)
  },
})