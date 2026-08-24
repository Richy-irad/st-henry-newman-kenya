import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeText } from "./locale/localeText"

export default defineType({
  name: "event",
  title: "Event",
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
    localeText({ name: "description", title: "Description", rows: 4 }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["Conference", "Retreat", "Symposium"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
    }),
  ],
})
