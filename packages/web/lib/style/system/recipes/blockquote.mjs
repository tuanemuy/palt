import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const blockquoteFn = /* @__PURE__ */ createRecipe('blockquote', {}, [])

const blockquoteVariantMap = {}

const blockquoteVariantKeys = Object.keys(blockquoteVariantMap)

export const blockquote = /* @__PURE__ */ Object.assign(blockquoteFn, {
  __recipe__: true,
  __name__: 'blockquote',
  raw: (props) => props,
  variantKeys: blockquoteVariantKeys,
  variantMap: blockquoteVariantMap,
  splitVariantProps(props) {
    return splitProps(props, blockquoteVariantKeys)
  },
})