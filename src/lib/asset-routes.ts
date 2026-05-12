import { readdirSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const mimeTypes: Record<string, string> = {
    '.css': 'text/css',
    '.csv': 'text/csv',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.md': 'text/markdown',
    '.mov': 'video/quicktime',
    '.mp4': 'video/mp4',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
    '.webp': 'image/webp',
    '.zip': 'application/zip',
};

export function contentAssetsRoot(section: string, id: string) {
    return join(process.cwd(), 'src/content', section, id, 'assets');
}

export function listFiles(directory: string): string[] {
    const entries = readdirSync(directory, { withFileTypes: true });

    return entries.flatMap((entry) => {
        const fullPath = join(directory, entry.name);

        if (entry.isDirectory()) {
            return listFiles(fullPath).map((child) => `${entry.name}/${child}`);
        }

        return entry.isFile() ? [entry.name] : [];
    });
}

export function contentAssetPaths(section: string, paramName: string) {
    const sectionRoot = join(process.cwd(), 'src/content', section);
    const ids = readdirSync(sectionRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((id) => {
            try {
                return statSync(contentAssetsRoot(section, id)).isDirectory();
            } catch {
                return false;
            }
        });

    return ids.flatMap((id) =>
        listFiles(contentAssetsRoot(section, id)).map((asset) => ({
            params: { [paramName]: id, asset },
            props: { filePath: join(contentAssetsRoot(section, id), asset) },
        })),
    );
}

export async function assetResponse(filePath: string) {
    const body = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream';

    return new Response(body, {
        headers: {
            'Content-Type': contentType,
        },
    });
}
