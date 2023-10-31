import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const alertTitleFn = /* @__PURE__ */ createRecipe('alertTitle', {}, [])

const alertTitleVariantMap = {}

const alertTitleVariantKeys = Object.keys(alertTitleVariantMap)

export const alertTitle = /* @__PURE__ */ Object.assign(alertTitleFn, {
  __recipe__: true,
  __name__: 'alertTitle',
  raw: (props) => props,
  variantKeys: alertTitleVariantKeys,
  variantMap: alertTitleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, alertTitleVariantKeys)
  },
})