import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const toastDefaultVariants = {
  "variant": "default"
}
const toastCompoundVariants = []

const toastSlotNames = [
  [
    "root",
    "toast__root"
  ],
  [
    "viewport",
    "toast__viewport"
  ],
  [
    "action",
    "toast__action"
  ],
  [
    "close",
    "toast__close"
  ],
  [
    "title",
    "toast__title"
  ],
  [
    "description",
    "toast__description"
  ]
]
const toastSlotFns = /* @__PURE__ */ toastSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, toastDefaultVariants, getSlotCompoundVariant(toastCompoundVariants, slotName))])

const toastFn = (props = {}) => {
  return Object.fromEntries(toastSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const toastVariantKeys = [
  "variant"
]

export const toast = /* @__PURE__ */ Object.assign(toastFn, {
  __recipe__: false,
  __name__: 'toast',
  raw: (props) => props,
  variantKeys: toastVariantKeys,
  variantMap: {
  "variant": [
    "default",
    "destructive"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, toastVariantKeys)
  },
})