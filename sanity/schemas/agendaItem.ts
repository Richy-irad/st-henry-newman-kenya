import { defineField, defineType } from "sanity"

export default defineType({
  name: "agendaItem",
  title: "Agenda Item",
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
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "followUrl",
      title: "Follow URL",
      type: "url",
    }),
    defineField({
      name: "followNote",
      title: "Follow Note",
      type: "string",
      description: "e.g. via Radio RCF-Liège",
    }),
    defineField({
      name: "content",
      title: "Post-event write-up (Markdown)",
      type: "text",
      rows: 20,
      description: "Markdown supported. To embed gallery images inline, upload them in the Gallery field below, then copy their CDN URLs into the markdown.",
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
          fields: [{ name: "caption", type: "string", title: "Caption" }],
        },
      ],
      description: "Post-event photo gallery (separate from the write-up)",
    }),
  ],
})
