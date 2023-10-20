import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tabsDefaultVariants = {}
const tabsCompoundVariants = []

const tabsSlotNames = [
  [
    "root",
    "tabs__root"
  ],
  [
    "list",
    "tabs__list"
  ],
  [
    "trigger",
    "tabs__trigger"
  ],
  [
    "content",
    "tabs__content"
  ]
]
const tabsSlotFns = /* @__PURE__ */ tabsSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tabsDefaultVariants, getSlotCompoundVariant(tabsCompoundVariants, slotName))])

const tabsFn = (props = {}) => {
  return Object.fromEntries(tabsSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const tabsVariantKeys = []

export const tabs = /* @__PURE__ */ Object.assign(tabsFn, {
  __recipe__: false,
  __name__: 'tabs',
  raw: (props) => props,
  variantKeys: tabsVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, tabsVariantKeys)
  },
})