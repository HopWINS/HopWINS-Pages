import type { APIRoute } from 'astro';
import { assetResponse, contentAssetPaths } from '@/lib/asset-routes';

export function getStaticPaths() {
    return contentAssetPaths('publication', 'slug');
}

export const GET: APIRoute<{ filePath: string }> = async ({ props }) => assetResponse(props.filePath);
