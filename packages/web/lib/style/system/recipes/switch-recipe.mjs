import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const switchRecipeDefaultVariants = {}
const switchRecipeCompoundVariants = []

const switchRecipeSlotNames = [
  [
    "root",
    "switchRecipe__root"
  ],
  [
    "thumb",
    "switchRecipe__thumb"
  ]
]
const switchRecipeSlotFns = /* @__PURE__ */ switchRecipeSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, switchRecipeDefaultVariants, getSlotCompoundVariant(switchRecipeCompoundVariants, slotName))])

const switchRecipeFn = (props = {}) => {
  return Object.fromEntries(switchRecipeSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const switchRecipeVariantKeys = []

export const switchRecipe = /* @__PURE__ */ Object.assign(switchRecipeFn, {
  __recipe__: false,
  __name__: 'switchRecipe',
  raw: (props) => props,
  variantKeys: switchRecipeVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, switchRecipeVariantKeys)
  },
})