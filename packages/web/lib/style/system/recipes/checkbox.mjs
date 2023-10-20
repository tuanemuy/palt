import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const checkboxDefaultVariants = {}
const checkboxCompoundVariants = []

const checkboxSlotNames = [
  [
    "root",
    "checkbox__root"
  ],
  [
    "indicator",
    "checkbox__indicator"
  ]
]
const checkboxSlotFns = /* @__PURE__ */ checkboxSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, checkboxDefaultVariants, getSlotCompoundVariant(checkboxCompoundVariants, slotName))])

const checkboxFn = (props = {}) => {
  return Object.fromEntries(checkboxSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const checkboxVariantKeys = []

export const checkbox = /* @__PURE__ */ Object.assign(checkboxFn, {
  __recipe__: false,
  __name__: 'checkbox',
  raw: (props) => props,
  variantKeys: checkboxVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, checkboxVariantKeys)
  },
})