import {defineField, defineType} from 'sanity'
import { Tag } from "lucide-react";

export const categoryType = defineType ({
  name: "category",
  title: "Categories",
  type: "document",
  icon: Tag,
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "icon",
      title: "Category Icon",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description"
    }
  }
});
