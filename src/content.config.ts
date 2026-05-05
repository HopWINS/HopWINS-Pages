import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const hrefSchema = z.string().min(1);
const keepFilePathId = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx|json)$/i, '');

const linkSchema = z.object({
    label: z.string(),
    url: hrefSchema,
    kind: z.enum(['paper', 'code', 'data', 'slides', 'video', 'website', 'other']).default('other'),
});

const imageSchema = z.object({
    src: hrefSchema,
    alt: z.string().default(''),
    caption: z.string().optional(),
});

const index = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/index', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string().optional(),
        description: z.string(),
        newsLimit: z.number().default(6),
        heroImages: z.array(imageSchema).default([]),
    }),
});

const news = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/news', generateId: keepFilePathId }),
    schema: z.object({
        items: z.array(
            z.object({
                date: z.coerce.date(),
                text: z.string(),
            }),
        ),
    }),
});

const research = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/research', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        shortTitle: z.string().optional(),
        summary: z.string(),
        order: z.number().default(999),
        image: imageSchema,
        gallery: z.array(imageSchema).default([]),
        publicationIds: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
    }),
});

const publication = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/publication', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        authors: z.array(z.string()),
        date: z.coerce.date(),
        venue: z.string(),
        venueType: z.enum(['conference', 'journal', 'workshop', 'preprint', 'software', 'book']).default('conference'),
        conference: z.string().optional(),
        award: z.string().optional(),
        highlight: z.boolean().default(false),
        research: z.array(z.string()).default([]),
        links: z.array(linkSchema).default([]),
        youtube: hrefSchema.optional(),
        draft: z.boolean().default(false),
    }),
});

const team = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/team', generateId: keepFilePathId }),
    schema: z.object({
        name: z.string(),
        role: z.string(),
        order: z.number().default(999),
        photo: imageSchema.optional(),
        homepage: hrefSchema.optional(),
        email: hrefSchema.optional(),
        alumniCurrent: z.string().optional(),
        draft: z.boolean().default(false),
    }),
});

const course = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/course', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string().optional(),
        shortName: z.string().optional(),
        code: z.string().optional(),
        semester: z.string().optional(),
        note: z.string().optional(),
        draft: z.boolean().default(false),
    }),
});

const join = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/join', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        order: z.number().default(999),
        draft: z.boolean().default(false),
    }),
});

export const collections = {
    index,
    news,
    research,
    publication,
    team,
    course,
    join,
};
