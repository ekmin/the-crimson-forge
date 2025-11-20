import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'
import { orderType } from './orderType'
import { orderItemType } from './orderItemType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, blockContentType, orderType, orderItemType],
}
