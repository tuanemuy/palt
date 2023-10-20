import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableFn = /* @__PURE__ */ createRecipe('table', {}, [])

const tableVariantMap = {}

const tableVariantKeys = Object.keys(tableVariantMap)

export const table = /* @__PURE__ */ Object.assign(tableFn, {
  __recipe__: true,
  __name__: 'table',
  raw: (props) => props,
  variantKeys: tableVariantKeys,
  variantMap: tableVariantMap,
  splitVariantProps(props) {
    return splitProps(props, tableVariantKeys)
  },
})