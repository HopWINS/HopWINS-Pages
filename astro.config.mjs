// @ts-check
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const siteMarkdown = readFileSync(new URL('./src/content/site/index.md', import.meta.url), 'utf-8');
const siteUrl = siteMarkdown.match(/^siteUrl:\s*["']?([^"'\n]+)["']?$/m)?.[1] ?? 'http://localhost:4321';

function rewriteMarkdownImagesToAssets() {
    const imageExtensions = /\.(png|jpe?g|webp|gif|svg)$/i;

    /** @param {string} url */
    function rewriteUrl(url) {
        if (/^(https?:|data:|\/|#|\.\.\/|\.\/assets\/|assets\/)/.test(url)) {
            return url;
        }

        const [path, suffix = ''] = url.split(/([?#].*)/, 2);

        if (!path.includes('/') && imageExtensions.test(path)) {
            return `./assets/${path}${suffix}`;
        }

        return url;
    }

    /** @param {any} node */
    function walk(node) {
        if (node && typeof node === 'object') {
            if (node.type === 'image' && typeof node.url === 'string') {
                if (!node.url.startsWith('./assets/')) {
                    node.url = rewriteUrl(node.url.replace(/^\.\//, ''));
                }
            }

            if (Array.isArray(node.children)) {
                for (const child of node.children) {
                    walk(child);
                }
            }
        }
    }

    /** @param {any} tree */
    return (tree) => walk(tree);
}

export default defineConfig({
    site: siteUrl,
    trailingSlash: 'ignore',
    integrations: [sitemap()],
    markdown: {
        remarkPlugins: [rewriteMarkdownImagesToAssets],
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
