import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const alertDescriptionFn = /* @__PURE__ */ createRecipe('alertDescription', {}, [])

const alertDescriptionVariantMap = {}

const alertDescriptionVariantKeys = Object.keys(alertDescriptionVariantMap)

export const alertDescription = /* @__PURE__ */ Object.assign(alertDescriptionFn, {
  __recipe__: true,
  __name__: 'alertDescription',
  raw: (props) => props,
  variantKeys: alertDescriptionVariantKeys,
  variantMap: alertDescriptionVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, alertDescriptionVariantKeys)
  },
})