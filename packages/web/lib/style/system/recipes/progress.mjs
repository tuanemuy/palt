import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const progressDefaultVariants = {}
const progressCompoundVariants = []

const progressSlotNames = [
  [
    "root",
    "progress__root"
  ],
  [
    "indicator",
    "progress__indicator"
  ]
]
const progressSlotFns = /* @__PURE__ */ progressSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, progressDefaultVariants, getSlotCompoundVariant(progressCompoundVariants, slotName))])

const progressFn = (props = {}) => {
  return Object.fromEntries(progressSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const progressVariantKeys = []

export const progress = /* @__PURE__ */ Object.assign(progressFn, {
  __recipe__: false,
  __name__: 'progress',
  raw: (props) => props,
  variantKeys: progressVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, progressVariantKeys)
  },
})