import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeText } from "./locale/localeText"

export default defineType({
  name: "newsItem",
  title: "News Item",
  type: "document",
  fields: [
    localeString({ name: "title", title: "Title" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (r) => r.required(),
    }),
    localeText({ name: "excerpt", title: "Excerpt", rows: 3 }),
    localeText({ name: "content", title: "Content (Markdown)", rows: 20 }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.en" },
  },
})
