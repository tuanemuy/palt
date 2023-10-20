import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const formMessageFn = /* @__PURE__ */ createRecipe('formMessage', {}, [])

const formMessageVariantMap = {}

const formMessageVariantKeys = Object.keys(formMessageVariantMap)

export const formMessage = /* @__PURE__ */ Object.assign(formMessageFn, {
  __recipe__: true,
  __name__: 'formMessage',
  raw: (props) => props,
  variantKeys: formMessageVariantKeys,
  variantMap: formMessageVariantMap,
  splitVariantProps(props) {
    return splitProps(props, formMessageVariantKeys)
  },
})