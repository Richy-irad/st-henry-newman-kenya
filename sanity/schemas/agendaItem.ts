import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeText } from "./locale/localeText"

export default defineType({
  name: "agendaItem",
  title: "Agenda Item",
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
    defineField({
      name: "celebration",
      title: "Celebration",
      type: "reference",
      to: [{ type: "celebration" }],
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "e.g. 19:00 — leave blank if all-day",
    }),
    localeString({ name: "location", title: "Location" }),
    defineField({
      name: "followUrl",
      title: "Follow URL",
      type: "url",
    }),
    localeString({
      name: "followNote",
      title: "Follow Note",
      description: "e.g. via Radio RCF-Liège",
      required: false,
    }),
    localeText({
      name: "content",
      title: "Post-event write-up (Markdown)",
      rows: 20,
      required: false,
      description:
        "Markdown supported. To embed gallery images inline, upload them in the Gallery field below, then copy their CDN URLs into the markdown.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Header image shown above the post-event write-up",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [localeString({ name: "caption", title: "Caption", required: false })],
        },
      ],
      description: "Post-event photo gallery (separate from the write-up)",
    }),
  ],
  preview: {
    select: { title: "title.en" },
  },
})
