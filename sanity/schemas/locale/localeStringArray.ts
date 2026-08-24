import { defineField } from "sanity"
import { SUPPORTED_LANGUAGES, NON_BASE_LANGUAGES } from "../../lib/locales"
import { StaleTranslationField } from "../../components/StaleTranslationField"

export function localeStringArray(field: { name: string; title: string }) {
  return defineField({
    name: field.name,
    title: field.title,
    type: "object",
    options: { collapsible: true, collapsed: false },
    components: { field: StaleTranslationField },
    fields: [
      ...SUPPORTED_LANGUAGES.map((lang) =>
        defineField({
          name: lang.id,
          title: lang.title,
          type: "array",
          of: [{ type: "string" }],
          validation: lang.isBase ? (r) => r.required().min(1) : undefined,
        }),
      ),
      ...NON_BASE_LANGUAGES.map((lang) =>
        defineField({
          name: `${lang.id}SourceHash`,
          title: `${lang.title} source hash`,
          type: "string",
          hidden: true,
        }),
      ),
    ],
  })
}
