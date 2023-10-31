import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const typographyTableFn = /* @__PURE__ */ createRecipe('typographyTable', {}, [])

const typographyTableVariantMap = {}

const typographyTableVariantKeys = Object.keys(typographyTableVariantMap)

export const typographyTable = /* @__PURE__ */ Object.assign(typographyTableFn, {
  __recipe__: true,
  __name__: 'typographyTable',
  raw: (props) => props,
  variantKeys: typographyTableVariantKeys,
  variantMap: typographyTableVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, typographyTableVariantKeys)
  },
})