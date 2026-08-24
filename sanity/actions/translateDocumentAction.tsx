import { useCallback, useState } from "react"
import { useDocumentOperation } from "sanity"
import type { DocumentActionComponent, DocumentActionProps } from "sanity"
import { useToast } from "@sanity/ui"
import { TRANSLATABLE_FIELDS } from "../lib/translatableFields"
import { NON_BASE_LANGUAGES } from "../lib/locales"
import { hashText } from "../lib/textHash"

type LocaleValue = { en?: string | string[] } & Record<string, unknown>
type Doc = Record<string, unknown>

function parseArrayFieldPath(fieldPath: string): { arrayName: string; subField: string } | null {
  const match = fieldPath.match(/^(.+)\[\]\.(.+)$/)
  return match ? { arrayName: match[1], subField: match[2] } : null
}

export const translateDocumentAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const { id, type, draft, published } = props
  const { patch } = useDocumentOperation(id, type)
  const toast = useToast()
  const [isTranslating, setIsTranslating] = useState(false)

  const fieldPaths = TRANSLATABLE_FIELDS[type]

  const handle = useCallback(async () => {
    if (!fieldPaths) return
    const doc = (draft ?? published) as Doc | null
    if (!doc) return

    setIsTranslating(true)
    try {
      // requestFields keys: either the field path itself, or "<array>.<itemKey>.<subField>"
      // for per-item array fields (e.g. agendaItem's gallery captions).
      const requestFields: Record<string, string | string[]> = {}
      const simplePaths: string[] = []
      const arrayEntries: { key: string; arrayName: string; subField: string; itemKey: string }[] = []

      for (const fieldPath of fieldPaths) {
        const arrayField = parseArrayFieldPath(fieldPath)
        if (arrayField) {
          const items = doc[arrayField.arrayName]
          if (Array.isArray(items)) {
            for (const item of items as Record<string, unknown>[]) {
              const itemKey = item._key as string | undefined
              const localeValue = item[arrayField.subField] as LocaleValue | undefined
              if (itemKey && localeValue?.en) {
                const key = `${arrayField.arrayName}.${itemKey}.${arrayField.subField}`
                requestFields[key] = localeValue.en
                arrayEntries.push({ key, arrayName: arrayField.arrayName, subField: arrayField.subField, itemKey })
              }
            }
          }
          continue
        }
        const localeValue = doc[fieldPath] as LocaleValue | undefined
        if (localeValue?.en) {
          requestFields[fieldPath] = localeValue.en
          simplePaths.push(fieldPath)
        }
      }

      if (Object.keys(requestFields).length === 0) {
        toast.push({ status: "warning", title: "Nothing to translate — fill in English fields first." })
        return
      }

      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: requestFields }),
      })
      if (!res.ok) throw new Error(`Translate API responded ${res.status}`)
      const translations = (await res.json()) as Record<string, Record<string, string | string[]>>

      const patches: { set: Record<string, unknown> }[] = []

      for (const fieldPath of simplePaths) {
        const byLang = translations[fieldPath]
        if (!byLang) continue
        const sourceHash = hashText(requestFields[fieldPath])
        const set: Record<string, unknown> = {}
        for (const lang of NON_BASE_LANGUAGES) {
          set[`${fieldPath}.${lang.id}`] = byLang[lang.id]
          set[`${fieldPath}.${lang.id}SourceHash`] = sourceHash
        }
        patches.push({ set })
      }

      for (const entry of arrayEntries) {
        const byLang = translations[entry.key]
        if (!byLang) continue
        const sourceHash = hashText(requestFields[entry.key])
        const set: Record<string, unknown> = {}
        for (const lang of NON_BASE_LANGUAGES) {
          const base = `${entry.arrayName}[_key=="${entry.itemKey}"].${entry.subField}`
          set[`${base}.${lang.id}`] = byLang[lang.id]
          set[`${base}.${lang.id}SourceHash`] = sourceHash
        }
        patches.push({ set })
      }

      patch.execute(patches)
      toast.push({
        status: "success",
        title: "Translated",
        description: "Review the fr/it text (and markdown formatting) before publishing.",
      })
    } catch (err) {
      toast.push({
        status: "error",
        title: "Translation failed",
        description: err instanceof Error ? err.message : String(err),
      })
    } finally {
      setIsTranslating(false)
    }
  }, [draft, published, fieldPaths, patch, toast])

  if (!fieldPaths) return null

  return {
    label: isTranslating ? "Translating…" : "Translate",
    onHandle: handle,
    disabled: isTranslating,
  }
}
