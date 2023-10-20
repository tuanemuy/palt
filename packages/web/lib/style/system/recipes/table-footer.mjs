import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableFooterFn = /* @__PURE__ */ createRecipe('tableFooter', {}, [])

const tableFooterVariantMap = {}

const tableFooterVariantKeys = Object.keys(tableFooterVariantMap)

export const tableFooter = /* @__PURE__ */ Object.assign(tableFooterFn, {
  __recipe__: true,
  __name__: 'tableFooter',
  raw: (props) => props,
  variantKeys: tableFooterVariantKeys,
  variantMap: tableFooterVariantMap,
  splitVariantProps(props) {
    return splitProps(props, tableFooterVariantKeys)
  },
})