import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const formDescriptionFn = /* @__PURE__ */ createRecipe('formDescription', {}, [])

const formDescriptionVariantMap = {}

const formDescriptionVariantKeys = Object.keys(formDescriptionVariantMap)

export const formDescription = /* @__PURE__ */ Object.assign(formDescriptionFn, {
  __recipe__: true,
  __name__: 'formDescription',
  raw: (props) => props,
  variantKeys: formDescriptionVariantKeys,
  variantMap: formDescriptionVariantMap,
  splitVariantProps(props) {
    return splitProps(props, formDescriptionVariantKeys)
  },
})