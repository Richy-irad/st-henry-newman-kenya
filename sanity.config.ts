import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { translateDocumentAction } from "./sanity/actions/translateDocumentAction";
import { TRANSLATABLE_FIELDS } from "./sanity/lib/translatableFields";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: "2024-06-01",
      defaultDataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, context) =>
      TRANSLATABLE_FIELDS[context.schemaType]
        ? [translateDocumentAction, ...prev]
        : prev,
  },
  title: "St. John Henry Newman Kenya",
});
