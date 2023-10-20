import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const commandDialogDefaultVariants = {}
const commandDialogCompoundVariants = []

const commandDialogSlotNames = [
  [
    "content",
    "command-dialog__content"
  ],
  [
    "command",
    "command-dialog__command"
  ]
]
const commandDialogSlotFns = /* @__PURE__ */ commandDialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, commandDialogDefaultVariants, getSlotCompoundVariant(commandDialogCompoundVariants, slotName))])

const commandDialogFn = (props = {}) => {
  return Object.fromEntries(commandDialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const commandDialogVariantKeys = []

export const commandDialog = /* @__PURE__ */ Object.assign(commandDialogFn, {
  __recipe__: false,
  __name__: 'commandDialog',
  raw: (props) => props,
  variantKeys: commandDialogVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, commandDialogVariantKeys)
  },
})