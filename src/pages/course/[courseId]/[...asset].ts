import type { APIRoute } from 'astro';
import { assetResponse, contentAssetPaths } from '@/lib/asset-routes';

export function getStaticPaths() {
    return contentAssetPaths('course', 'courseId');
}

export const GET: APIRoute<{ filePath: string }> = async ({ props }) => assetResponse(props.filePath);
