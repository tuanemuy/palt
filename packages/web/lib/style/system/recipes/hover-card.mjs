import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const hoverCardDefaultVariants = {}
const hoverCardCompoundVariants = []

const hoverCardSlotNames = [
  [
    "root",
    "hoverCard__root"
  ],
  [
    "trigger",
    "hoverCard__trigger"
  ],
  [
    "content",
    "hoverCard__content"
  ]
]
const hoverCardSlotFns = /* @__PURE__ */ hoverCardSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, hoverCardDefaultVariants, getSlotCompoundVariant(hoverCardCompoundVariants, slotName))])

const hoverCardFn = (props = {}) => {
  return Object.fromEntries(hoverCardSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const hoverCardVariantKeys = []

export const hoverCard = /* @__PURE__ */ Object.assign(hoverCardFn, {
  __recipe__: false,
  __name__: 'hoverCard',
  raw: (props) => props,
  variantKeys: hoverCardVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, hoverCardVariantKeys)
  },
})