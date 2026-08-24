import { defineField } from "sanity"
import { SUPPORTED_LANGUAGES, NON_BASE_LANGUAGES } from "../../lib/locales"
import { StaleTranslationField } from "../../components/StaleTranslationField"

export function localeString(field: {
  name: string
  title: string
  description?: string
  required?: boolean
}) {
  const required = field.required ?? true
  return defineField({
    name: field.name,
    title: field.title,
    description: field.description,
    type: "object",
    options: { collapsible: true, collapsed: false },
    components: { field: StaleTranslationField },
    fields: [
      ...SUPPORTED_LANGUAGES.map((lang) =>
        defineField({
          name: lang.id,
          title: lang.title,
          type: "string",
          validation: lang.isBase && required ? (r) => r.required() : undefined,
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
