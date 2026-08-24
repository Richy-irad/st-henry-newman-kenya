import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeText } from "./locale/localeText"

export default defineType({
  name: "celebration",
  title: "Celebration",
  type: "document",
  fields: [
    localeString({ name: "name", title: "Name" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en" },
      validation: (r) => r.required(),
    }),
    localeText({ name: "description", title: "Description", rows: 3, required: false }),
  ],
})
