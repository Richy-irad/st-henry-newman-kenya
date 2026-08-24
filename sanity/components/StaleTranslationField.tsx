import type { ObjectFieldProps } from "sanity"
import { Badge, Flex, Stack } from "@sanity/ui"
import { NON_BASE_LANGUAGES } from "../lib/locales"
import { hashText } from "../lib/textHash"

type LocaleObjectValue = { en?: string | string[] } & Record<string, unknown>

export function StaleTranslationField(props: ObjectFieldProps<LocaleObjectValue>) {
  const value = props.value
  const staleLangs = value
    ? NON_BASE_LANGUAGES.filter((lang) => {
        const translated = value[lang.id]
        if (!translated) return false
        const storedHash = value[`${lang.id}SourceHash`]
        return hashText(value.en) !== storedHash
      })
    : []

  return (
    <Stack space={2}>
      {staleLangs.length > 0 && (
        <Flex gap={2} wrap="wrap">
          {staleLangs.map((lang) => (
            <Badge key={lang.id} tone="caution" mode="outline">
              {lang.title} may be outdated — English changed since last translation
            </Badge>
          ))}
        </Flex>
      )}
      {props.renderDefault(props)}
    </Stack>
  )
}
