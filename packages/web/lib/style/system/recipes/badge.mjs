import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const badgeFn = /* @__PURE__ */ createRecipe('badge', {
  "variant": "default"
}, [])

const badgeVariantMap = {
  "variant": [
    "default",
    "secondary",
    "destructive",
    "outline"
  ]
}

const badgeVariantKeys = Object.keys(badgeVariantMap)

export const badge = /* @__PURE__ */ Object.assign(badgeFn, {
  __recipe__: true,
  __name__: 'badge',
  raw: (props) => props,
  variantKeys: badgeVariantKeys,
  variantMap: badgeVariantMap,
  splitVariantProps(props) {
    return splitProps(props, badgeVariantKeys)
  },
})