import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const sheetDefaultVariants = {
  "side": "right"
}
const sheetCompoundVariants = []

const sheetSlotNames = [
  [
    "root",
    "sheet__root"
  ],
  [
    "trigger",
    "sheet__trigger"
  ],
  [
    "close",
    "sheet__close"
  ],
  [
    "portal",
    "sheet__portal"
  ],
  [
    "overlay",
    "sheet__overlay"
  ],
  [
    "header",
    "sheet__header"
  ],
  [
    "footer",
    "sheet__footer"
  ],
  [
    "title",
    "sheet__title"
  ],
  [
    "description",
    "sheet__description"
  ],
  [
    "content",
    "sheet__content"
  ],
  [
    "contentClose",
    "sheet__contentClose"
  ]
]
const sheetSlotFns = /* @__PURE__ */ sheetSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, sheetDefaultVariants, getSlotCompoundVariant(sheetCompoundVariants, slotName))])

const sheetFn = (props = {}) => {
  return Object.fromEntries(sheetSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const sheetVariantKeys = [
  "side"
]

export const sheet = /* @__PURE__ */ Object.assign(sheetFn, {
  __recipe__: false,
  __name__: 'sheet',
  raw: (props) => props,
  variantKeys: sheetVariantKeys,
  variantMap: {
  "side": [
    "top",
    "bottom",
    "left",
    "right"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, sheetVariantKeys)
  },
})