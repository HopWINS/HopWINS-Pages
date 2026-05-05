// @ts-check
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = JSON.parse(readFileSync(new URL('./src/content/config/site.json', import.meta.url), 'utf-8'));

export default defineConfig({
    site: site.siteUrl,
    trailingSlash: 'ignore',
    integrations: [sitemap()],
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
});
