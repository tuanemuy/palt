import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const avatarDefaultVariants = {}
const avatarCompoundVariants = []

const avatarSlotNames = [
  [
    "root",
    "avatar__root"
  ],
  [
    "image",
    "avatar__image"
  ],
  [
    "fallback",
    "avatar__fallback"
  ]
]
const avatarSlotFns = /* @__PURE__ */ avatarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, avatarDefaultVariants, getSlotCompoundVariant(avatarCompoundVariants, slotName))])

const avatarFn = (props = {}) => {
  return Object.fromEntries(avatarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const avatarVariantKeys = []

export const avatar = /* @__PURE__ */ Object.assign(avatarFn, {
  __recipe__: false,
  __name__: 'avatar',
  raw: (props) => props,
  variantKeys: avatarVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, avatarVariantKeys)
  },
})