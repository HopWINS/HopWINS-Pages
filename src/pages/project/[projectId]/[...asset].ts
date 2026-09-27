import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { assetResponse, contentAssetPaths } from '@/lib/asset-routes';

export async function getStaticPaths() {
    const publicationPage = await getEntry('publication', 'index');
    const projectIds = new Set(
        publicationPage?.data.publication
            .filter((paper) => paper.project)
            .map((paper) => paper.id) ?? [],
    );

    return contentAssetPaths('project', 'projectId', projectIds);
}

export const GET: APIRoute<{ filePath: string }> = async ({ props }) => assetResponse(props.filePath);
