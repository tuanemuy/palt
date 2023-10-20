import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const typographyTableContainerFn = /* @__PURE__ */ createRecipe('typographyTableContainer', {}, [])

const typographyTableContainerVariantMap = {}

const typographyTableContainerVariantKeys = Object.keys(typographyTableContainerVariantMap)

export const typographyTableContainer = /* @__PURE__ */ Object.assign(typographyTableContainerFn, {
  __recipe__: true,
  __name__: 'typographyTableContainer',
  raw: (props) => props,
  variantKeys: typographyTableContainerVariantKeys,
  variantMap: typographyTableContainerVariantMap,
  splitVariantProps(props) {
    return splitProps(props, typographyTableContainerVariantKeys)
  },
})