import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const accordionDefaultVariants = {}
const accordionCompoundVariants = []

const accordionSlotNames = [
  [
    "root",
    "accordion__root"
  ],
  [
    "item",
    "accordion__item"
  ],
  [
    "header",
    "accordion__header"
  ],
  [
    "trigger",
    "accordion__trigger"
  ],
  [
    "content",
    "accordion__content"
  ]
]
const accordionSlotFns = /* @__PURE__ */ accordionSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, accordionDefaultVariants, getSlotCompoundVariant(accordionCompoundVariants, slotName))])

const accordionFn = (props = {}) => {
  return Object.fromEntries(accordionSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const accordionVariantKeys = []

export const accordion = /* @__PURE__ */ Object.assign(accordionFn, {
  __recipe__: false,
  __name__: 'accordion',
  raw: (props) => props,
  variantKeys: accordionVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, accordionVariantKeys)
  },
})