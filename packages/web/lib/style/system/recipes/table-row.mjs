import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableRowFn = /* @__PURE__ */ createRecipe('tableRow', {}, [])

const tableRowVariantMap = {}

const tableRowVariantKeys = Object.keys(tableRowVariantMap)

export const tableRow = /* @__PURE__ */ Object.assign(tableRowFn, {
  __recipe__: true,
  __name__: 'tableRow',
  raw: (props) => props,
  variantKeys: tableRowVariantKeys,
  variantMap: tableRowVariantMap,
  splitVariantProps(props) {
    return splitProps(props, tableRowVariantKeys)
  },
})