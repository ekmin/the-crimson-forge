import {defineField, defineType} from 'sanity'
import { ShoppingCart } from "lucide-react";

export const productType = defineType ({
  name: "product",
  title: "Products",
  type: "document",
  icon: ShoppingCart,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    })
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price"
    },
    prepare(selection) {
      const {title, price, media} = selection
      return {
        title: title,
        subtitle: price,
        media: media
      }
    }
  }
});
