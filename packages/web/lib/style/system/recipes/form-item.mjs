import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const formItemFn = /* @__PURE__ */ createRecipe('formItem', {}, [])

const formItemVariantMap = {}

const formItemVariantKeys = Object.keys(formItemVariantMap)

export const formItem = /* @__PURE__ */ Object.assign(formItemFn, {
  __recipe__: true,
  __name__: 'formItem',
  raw: (props) => props,
  variantKeys: formItemVariantKeys,
  variantMap: formItemVariantMap,
  splitVariantProps(props) {
    return splitProps(props, formItemVariantKeys)
  },
})