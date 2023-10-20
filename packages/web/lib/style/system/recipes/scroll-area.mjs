import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const scrollAreaDefaultVariants = {}
const scrollAreaCompoundVariants = []

const scrollAreaSlotNames = [
  [
    "root",
    "scrollArea__root"
  ],
  [
    "viewport",
    "scrollArea__viewport"
  ],
  [
    "corner",
    "scrollArea__corner"
  ],
  [
    "scrollbar",
    "scrollArea__scrollbar"
  ],
  [
    "thumb",
    "scrollArea__thumb"
  ]
]
const scrollAreaSlotFns = /* @__PURE__ */ scrollAreaSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, scrollAreaDefaultVariants, getSlotCompoundVariant(scrollAreaCompoundVariants, slotName))])

const scrollAreaFn = (props = {}) => {
  return Object.fromEntries(scrollAreaSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const scrollAreaVariantKeys = []

export const scrollArea = /* @__PURE__ */ Object.assign(scrollAreaFn, {
  __recipe__: false,
  __name__: 'scrollArea',
  raw: (props) => props,
  variantKeys: scrollAreaVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, scrollAreaVariantKeys)
  },
})