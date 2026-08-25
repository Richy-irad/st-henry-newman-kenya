import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeText } from "./locale/localeText"

export default defineType({
  name: "sisterOrg",
  title: "Sister Organisation",
  type: "document",
  fields: [
    localeString({ name: "name", title: "Name" }),
    localeText({ name: "description", title: "Description", rows: 3 }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name.en" },
  },
})
