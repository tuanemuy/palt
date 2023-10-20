import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const textareaFn = /* @__PURE__ */ createRecipe('textarea', {}, [])

const textareaVariantMap = {}

const textareaVariantKeys = Object.keys(textareaVariantMap)

export const textarea = /* @__PURE__ */ Object.assign(textareaFn, {
  __recipe__: true,
  __name__: 'textarea',
  raw: (props) => props,
  variantKeys: textareaVariantKeys,
  variantMap: textareaVariantMap,
  splitVariantProps(props) {
    return splitProps(props, textareaVariantKeys)
  },
})