import { createImageUrlBuilder } from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"
import { sanityClient } from "./client"

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource): string {
  return builder.image(source).url()
}
