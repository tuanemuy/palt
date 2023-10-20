import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableHeaderFn = /* @__PURE__ */ createRecipe('tableHeader', {}, [])

const tableHeaderVariantMap = {}

const tableHeaderVariantKeys = Object.keys(tableHeaderVariantMap)

export const tableHeader = /* @__PURE__ */ Object.assign(tableHeaderFn, {
  __recipe__: true,
  __name__: 'tableHeader',
  raw: (props) => props,
  variantKeys: tableHeaderVariantKeys,
  variantMap: tableHeaderVariantMap,
  splitVariantProps(props) {
    return splitProps(props, tableHeaderVariantKeys)
  },
})