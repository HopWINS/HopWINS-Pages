// @ts-check
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const siteMarkdown = readFileSync(new URL('./src/content/site/index.md', import.meta.url), 'utf-8');
const siteUrl = siteMarkdown.match(/^siteUrl:\s*["']?([^"'\n]+)["']?$/m)?.[1] ?? 'http://localhost:4321';

const imageExtensions = /\.(png|jpe?g|webp|gif|svg)$/i;

/** @param {string} url */
function rewriteUrl(url) {
    if (/^(https?:|data:|\/|#|\.\.\/|\.\/assets\/|assets\/)/i.test(url)) {
        return url;
    }

    const [path, suffix = ''] = url.split(/([?#].*)/, 2);

    if (!path.includes('/') && imageExtensions.test(path)) {
        return `./assets/${path}${suffix}`;
    }

    return url;
}

const rewriteMarkdownImagesToAssets = {
    name: 'rewrite-markdown-images-to-assets',

    /** @param {{ url: string }} node @param {{ setProperty: Function }} context */
    image(node, context) {
        const url = node.url.startsWith('./assets/') ? node.url : rewriteUrl(node.url.replace(/^\.\//, ''));

        if (url !== node.url) {
            context.setProperty(node, 'url', url);
        }
    },
};

export default defineConfig({
    site: siteUrl,
    trailingSlash: 'ignore',
    compressHTML: true,
    integrations: [sitemap()],
    markdown: {
        processor: satteri({ mdastPlugins: [rewriteMarkdownImagesToAssets] }),
    },
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
});
