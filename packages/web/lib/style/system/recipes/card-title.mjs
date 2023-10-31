import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const cardTitleFn = /* @__PURE__ */ createRecipe('cardTitle', {}, [])

const cardTitleVariantMap = {}

const cardTitleVariantKeys = Object.keys(cardTitleVariantMap)

export const cardTitle = /* @__PURE__ */ Object.assign(cardTitleFn, {
  __recipe__: true,
  __name__: 'cardTitle',
  raw: (props) => props,
  variantKeys: cardTitleVariantKeys,
  variantMap: cardTitleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, cardTitleVariantKeys)
  },
})