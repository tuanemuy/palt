import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const popoverDefaultVariants = {}
const popoverCompoundVariants = []

const popoverSlotNames = [
  [
    "root",
    "popover__root"
  ],
  [
    "trigger",
    "popover__trigger"
  ],
  [
    "portal",
    "popover__portal"
  ],
  [
    "content",
    "popover__content"
  ]
]
const popoverSlotFns = /* @__PURE__ */ popoverSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, popoverDefaultVariants, getSlotCompoundVariant(popoverCompoundVariants, slotName))])

const popoverFn = (props = {}) => {
  return Object.fromEntries(popoverSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const popoverVariantKeys = []

export const popover = /* @__PURE__ */ Object.assign(popoverFn, {
  __recipe__: false,
  __name__: 'popover',
  raw: (props) => props,
  variantKeys: popoverVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, popoverVariantKeys)
  },
})