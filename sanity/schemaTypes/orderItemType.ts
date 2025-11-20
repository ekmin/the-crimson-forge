import {defineField, defineType} from 'sanity'

export const orderItemType = defineType ({
  name: "orderItem",
  title: "Order Item",
  type: "object",
  fields: [
    defineField({
      name: "product",
      title: "Product Bought",
      type: "reference",
      to: [{ type: "product" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      product: "product.name",
      quantity: "quantity",
      image: "product.image",
      price: "product.price",
    },
    prepare(select) {
      return {
        title: `${select.quantity} x ${select.product}`,
        subtitle: `${select.price * select.quantity}`,
        media: select.image,
      }
    }
  }
});
