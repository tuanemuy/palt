import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const formLabelFn = /* @__PURE__ */ createRecipe('formLabel', {}, [])

const formLabelVariantMap = {}

const formLabelVariantKeys = Object.keys(formLabelVariantMap)

export const formLabel = /* @__PURE__ */ Object.assign(formLabelFn, {
  __recipe__: true,
  __name__: 'formLabel',
  raw: (props) => props,
  variantKeys: formLabelVariantKeys,
  variantMap: formLabelVariantMap,
  splitVariantProps(props) {
    return splitProps(props, formLabelVariantKeys)
  },
})