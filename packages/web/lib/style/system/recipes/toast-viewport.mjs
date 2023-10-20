import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const toastViewportFn = /* @__PURE__ */ createRecipe('toastViewport', {}, [])

const toastViewportVariantMap = {}

const toastViewportVariantKeys = Object.keys(toastViewportVariantMap)

export const toastViewport = /* @__PURE__ */ Object.assign(toastViewportFn, {
  __recipe__: true,
  __name__: 'toastViewport',
  raw: (props) => props,
  variantKeys: toastViewportVariantKeys,
  variantMap: toastViewportVariantMap,
  splitVariantProps(props) {
    return splitProps(props, toastViewportVariantKeys)
  },
})