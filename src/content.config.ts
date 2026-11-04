import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Blog posts live as Markdown files in src/content/blog/.
// Frontmatter (title, date, slug) is ported verbatim from the Next.js site's
// content/blogs/*.md files.
const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        slug: z.string(),
    }),
});

export const collections = { blog };
