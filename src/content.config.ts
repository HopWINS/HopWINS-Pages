import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const hrefSchema = z.string().min(1);
const linkIdSchema = z.string().regex(
    /^[a-z][a-z0-9-]*$/,
    'Link names must use lowercase letters, numbers, and hyphens.',
);
const keepFilePathId = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx|json)$/i, '');

const teamPersonSchema = z.union([
    z.string(),
    z.object({
        name: z.string(),
        homepage: hrefSchema.optional(),
    }).strict(),
]);

const alumniPersonSchema = z.object({
    name: z.string(),
    role: z.string(),
    period: z.string().optional(),
    position: z.string().optional(),
    homepage: hrefSchema.optional(),
}).strict();

const tableColumnsSchema = z.record(z.string(), z.string());

const navItemSchema = z.object({
    id: z.string(),
    label: z.string(),
}).strict();

const courseInfoSchema = z.object({
    id: z.string(),
    title: z.string(),
    shortName: z.string().optional(),
    code: z.string().optional(),
    semester: z.string().optional(),
    description: z.string().optional(),
}).strict();

const teachingSchema = z.object({
    semester: z.string(),
    id: z.string(),
}).strict();

const publicationPaperSchema = z.object({
    id: z.string(),
    title: z.string(),
    shortTitle: z.string().optional(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    venue: z.string(),
    award: z.string().optional(),
    highlight: z.boolean().default(false),
    research: z.array(z.string()).default([]),
    project: z.boolean().default(false),
    links: z.record(linkIdSchema, hrefSchema).default({}),
}).strict().superRefine((paper, context) => {
    if (paper.project && paper.links.project) {
        context.addIssue({
            code: 'custom',
            path: ['links'],
            message: 'Remove links.project when project is true; the internal Project button is generated automatically.',
        });
    }
});

const researchAreaSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    pubLimit: z.number().int().min(0).optional(),
    image: z.array(z.object({
        src: z.string(),
        alt: z.string().default(''),
        caption: z.string().optional(),
    }).strict()).min(1),
}).strict();

type ImageSchemaFactory = () => z.ZodType;

function imageFromAssets(image: ImageSchemaFactory) {
    return z.preprocess((value) => {
        if (typeof value !== 'string') {
            return value;
        }

        return /^(https?:|\/|\.\/|\.\.\/)/.test(value) ? value : `./assets/${value}`;
    }, image());
}

const index = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/index', generateId: keepFilePathId }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        newsLimit: z.number().default(6),
        heroImages: z.array(z.object({
            src: imageFromAssets(image),
            alt: z.string().default(''),
            caption: z.string().optional(),
        }).strict()).default([]),
    }).strict(),
});

const news = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/news', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        news: z.array(
            z.object({
                date: z.coerce.date(),
                text: z.string(),
            }).strict(),
        ),
    }).strict(),
});

const research = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/research', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        pubLimit: z.number().int().min(0).default(2),
        areas: z.array(researchAreaSchema).default([]),
    }).strict(),
});

const researchDetail = defineCollection({
    loader: glob({ pattern: '*/index.md', base: './src/content/research', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
    }).strict(),
});

const publication = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/publication', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        publication: z.array(publicationPaperSchema).default([]),
    }).strict(),
});

const project = defineCollection({
    loader: glob({ pattern: '*/index.md', base: './src/content/project', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
    }).strict(),
});

const team = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/team', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
    }).strict(),
});

const teamGroup = defineCollection({
    loader: glob({ pattern: '*/index.md', base: './src/content/team', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        members: z.record(z.string(), z.array(teamPersonSchema)).optional(),
        alumni: z.array(alumniPersonSchema).optional(),
        columns: tableColumnsSchema.optional(),
    }).strict(),
});

const teamMember = defineCollection({
    loader: glob({ pattern: ['pi/*.md', 'phd/*.md', '!pi/index.md', '!phd/index.md'], base: './src/content/team', generateId: keepFilePathId }),
    schema: ({ image }) => z.object({
        title: z.string().optional(),
        name: z.string(),
        role: z.string(),
        order: z.number().default(999),
        photo: z.object({
            src: imageFromAssets(image),
            alt: z.string().default(''),
        }).strict().optional(),
        homepage: hrefSchema.optional(),
        email: hrefSchema.optional(),
    }).strict(),
});

const course = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/course', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
        courses: z.array(courseInfoSchema).default([]),
        teaching: z.array(teachingSchema).default([]),
    }).strict(),
});

const coursePage = defineCollection({
    loader: glob({ pattern: '*/*.md', base: './src/content/course', generateId: keepFilePathId }),
    schema: z.object({}).strict(),
});

const join = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/join', generateId: keepFilePathId }),
    schema: z.object({
        title: z.string(),
    }).strict(),
});

const site = defineCollection({
    loader: glob({ pattern: 'index.md', base: './src/content/site', generateId: keepFilePathId }),
    schema: z.object({
        siteUrl: z.url(),
        labName: z.string(),
        labIcon: z.union([
            z.string(),
            z.object({
                src: z.string(),
            }).strict(),
        ]).nullable().optional(),
        nav: z.array(navItemSchema).default([]),
        footer: z.object({
            contact: z.object({
                location: z.string(),
                email: z.string(),
                addressIcon: z.object({
                    src: z.string(),
                    alt: z.string().default(''),
                }).strict(),
                emailIcon: z.object({
                    src: z.string(),
                    alt: z.string().default(''),
                }).strict(),
            }).strict(),
            school: z.object({
                name: z.string(),
                logo: z.object({
                    src: z.string(),
                    alt: z.string().default(''),
                }).strict().optional(),
            }).strict(),
        }).strict(),
    }).strict(),
});

export const collections = {
    index,
    news,
    research,
    researchDetail,
    publication,
    project,
    team,
    teamGroup,
    teamMember,
    course,
    coursePage,
    join,
    site,
};
