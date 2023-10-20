import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const formControlFn = /* @__PURE__ */ createRecipe('formControl', {}, [])

const formControlVariantMap = {}

const formControlVariantKeys = Object.keys(formControlVariantMap)

export const formControl = /* @__PURE__ */ Object.assign(formControlFn, {
  __recipe__: true,
  __name__: 'formControl',
  raw: (props) => props,
  variantKeys: formControlVariantKeys,
  variantMap: formControlVariantMap,
  splitVariantProps(props) {
    return splitProps(props, formControlVariantKeys)
  },
})