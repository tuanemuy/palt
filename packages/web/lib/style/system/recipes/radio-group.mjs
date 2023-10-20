import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const radioGroupDefaultVariants = {}
const radioGroupCompoundVariants = []

const radioGroupSlotNames = [
  [
    "root",
    "radioGroup__root"
  ],
  [
    "item",
    "radioGroup__item"
  ],
  [
    "indicator",
    "radioGroup__indicator"
  ],
  [
    "icon",
    "radioGroup__icon"
  ]
]
const radioGroupSlotFns = /* @__PURE__ */ radioGroupSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, radioGroupDefaultVariants, getSlotCompoundVariant(radioGroupCompoundVariants, slotName))])

const radioGroupFn = (props = {}) => {
  return Object.fromEntries(radioGroupSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const radioGroupVariantKeys = []

export const radioGroup = /* @__PURE__ */ Object.assign(radioGroupFn, {
  __recipe__: false,
  __name__: 'radioGroup',
  raw: (props) => props,
  variantKeys: radioGroupVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, radioGroupVariantKeys)
  },
})