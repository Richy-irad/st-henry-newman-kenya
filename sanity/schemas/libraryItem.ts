import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeText } from "./locale/localeText"

export default defineType({
  name: "libraryItem",
  title: "Library Item",
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
    localeText({ name: "description", title: "Description", rows: 3 }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (r) => r.required().min(1000).max(2100),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["works", "translations", "articles"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
  ],
})
