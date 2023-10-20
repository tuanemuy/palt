import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableContainerFn = /* @__PURE__ */ createRecipe('tableContainer', {}, [])

const tableContainerVariantMap = {}

const tableContainerVariantKeys = Object.keys(tableContainerVariantMap)

export const tableContainer = /* @__PURE__ */ Object.assign(tableContainerFn, {
  __recipe__: true,
  __name__: 'tableContainer',
  raw: (props) => props,
  variantKeys: tableContainerVariantKeys,
  variantMap: tableContainerVariantMap,
  splitVariantProps(props) {
    return splitProps(props, tableContainerVariantKeys)
  },
})