import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const cardFn = /* @__PURE__ */ createRecipe('card', {}, [])

const cardVariantMap = {}

const cardVariantKeys = Object.keys(cardVariantMap)

export const card = /* @__PURE__ */ Object.assign(cardFn, {
  __recipe__: true,
  __name__: 'card',
  raw: (props) => props,
  variantKeys: cardVariantKeys,
  variantMap: cardVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, cardVariantKeys)
  },
})