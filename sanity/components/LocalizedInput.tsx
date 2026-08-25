import { useCallback } from "react"
import { PatchEvent, set, type FormPatch, type ObjectInputProps } from "sanity"
import { NON_BASE_LANGUAGES } from "../lib/locales"
import { hashText } from "../lib/textHash"

type LocaleObjectValue = { en?: string | string[] } & Record<string, unknown>

// Pure patch transform, factored out so it's testable without a live Studio
// session (Studio writes are gated by Sanity's own login, which isn't
// available in this environment). Stamps {lang}SourceHash alongside any
// patch that touches a non-base-language field, using the given English
// value — see LocalizedInput below for why.
export function withTranslationHashPatches(
  patch: FormPatch | FormPatch[] | PatchEvent,
  enValue: string | string[] | undefined,
): PatchEvent {
  const event = PatchEvent.from(patch)
  const touchedLangs = new Set(
    event.patches
      .map((p) => NON_BASE_LANGUAGES.find((lang) => lang.id === p.path[0])?.id)
      .filter((id): id is (typeof NON_BASE_LANGUAGES)[number]["id"] => Boolean(id)),
  )

  if (touchedLangs.size === 0) return event

  const hashPatches = [...touchedLangs].map((langId) =>
    set(hashText(enValue), [`${langId}SourceHash`]),
  )
  return event.append(...hashPatches)
}

// A maintainer typing directly into a fr/it field (instead of clicking
// "Translate") is, implicitly, vouching that it matches the current English
// text — so stamp the source hash right along with their edit. Without this,
// a hand-typed translation has no hash, which means the stale-translation
// badge would flag it forever, and the next automated backfill run (which
// only skips fields whose hash already matches) would overwrite it.
export function LocalizedInput(props: ObjectInputProps<LocaleObjectValue>) {
  const handleChange = useCallback(
    (patch: FormPatch | FormPatch[] | PatchEvent) => {
      props.onChange(withTranslationHashPatches(patch, props.value?.en))
    },
    [props.value, props.onChange],
  )

  return props.renderDefault({ ...props, onChange: handleChange })
}
