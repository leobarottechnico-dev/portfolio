import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './sanity-content.js';

const builder = createImageUrlBuilder(sanityClient);

export function imageUrl(image, width = 1200) {
  if (!image?.asset) return null;
  return builder.image(image).width(width).auto('format').url();
}
