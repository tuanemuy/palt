import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableBodyFn = /* @__PURE__ */ createRecipe('tableBody', {}, [])

const tableBodyVariantMap = {}

const tableBodyVariantKeys = Object.keys(tableBodyVariantMap)

export const tableBody = /* @__PURE__ */ Object.assign(tableBodyFn, {
  __recipe__: true,
  __name__: 'tableBody',
  raw: (props) => props,
  variantKeys: tableBodyVariantKeys,
  variantMap: tableBodyVariantMap,
  splitVariantProps(props) {
    return splitProps(props, tableBodyVariantKeys)
  },
})