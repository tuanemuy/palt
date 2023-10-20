import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const cardHeaderFn = /* @__PURE__ */ createRecipe('cardHeader', {}, [])

const cardHeaderVariantMap = {}

const cardHeaderVariantKeys = Object.keys(cardHeaderVariantMap)

export const cardHeader = /* @__PURE__ */ Object.assign(cardHeaderFn, {
  __recipe__: true,
  __name__: 'cardHeader',
  raw: (props) => props,
  variantKeys: cardHeaderVariantKeys,
  variantMap: cardHeaderVariantMap,
  splitVariantProps(props) {
    return splitProps(props, cardHeaderVariantKeys)
  },
})