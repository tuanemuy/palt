import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const formItemFn = /* @__PURE__ */ createRecipe('formItem', {}, [])

const formItemVariantMap = {}

const formItemVariantKeys = Object.keys(formItemVariantMap)

export const formItem = /* @__PURE__ */ Object.assign(formItemFn, {
  __recipe__: true,
  __name__: 'formItem',
  raw: (props) => props,
  variantKeys: formItemVariantKeys,
  variantMap: formItemVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, formItemVariantKeys)
  },
})