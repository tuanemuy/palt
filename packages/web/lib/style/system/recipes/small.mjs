import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const smallFn = /* @__PURE__ */ createRecipe('small', {}, [])

const smallVariantMap = {}

const smallVariantKeys = Object.keys(smallVariantMap)

export const small = /* @__PURE__ */ Object.assign(smallFn, {
  __recipe__: true,
  __name__: 'small',
  raw: (props) => props,
  variantKeys: smallVariantKeys,
  variantMap: smallVariantMap,
  splitVariantProps(props) {
    return splitProps(props, smallVariantKeys)
  },
})