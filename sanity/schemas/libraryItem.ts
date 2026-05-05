import { defineField, defineType } from "sanity"

export default defineType({
  name: "libraryItem",
  title: "Library Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
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
