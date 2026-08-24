import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeText } from "./locale/localeText"

export default defineType({
  name: "resource",
  title: "Resource",
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["publications", "studies", "documents"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "downloadUrl",
      title: "Download URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fileSize",
      title: "File Size",
      type: "string",
    }),
  ],
})
