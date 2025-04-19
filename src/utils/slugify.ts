// utils/slugify.ts
export const slugify = (text: string): string =>
    text
      .toLowerCase()
      .replace(/[\s&,+]+/g, '-')  // replace spaces, commas, and ampersands with hyphens
      .replace(/[^\w-]+/g, '')    // remove any other non-word characters
      .replace(/--+/g, '-')       // replace multiple dashes with single dash
      .replace(/^-+|-+$/g, '');   // trim leading/trailing dashes
  