import { defineField, defineType } from "sanity"
import { localeString } from "./locale/localeString"
import { localeStringArray } from "./locale/localeStringArray"

export default defineType({
  name: "membershipTier",
  title: "Membership Tier",
  type: "document",
  fields: [
    localeString({ name: "name", title: "Name" }),
    localeString({ name: "price", title: "Price" }),
    localeStringArray({ name: "benefits", title: "Benefits" }),
    defineField({
      name: "highlighted",
      title: "Highlighted",
      type: "boolean",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})
