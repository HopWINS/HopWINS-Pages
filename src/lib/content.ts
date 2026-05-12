export function entrySlug(entry: { id: string }) {
    return entry.id.replace(/\.(md|mdx|json)$/i, '').replace(/\\/g, '/');
}

export function folderRoute(entry: { id: string }) {
    const parts = entrySlug(entry).split('/').filter(Boolean);

    if (parts.at(-1) === 'index') {
        parts.pop();
    }

    return parts.join('/');
}

export function byOrderThenTitle<T extends { data: { order?: number; title?: string; name?: string } }>(a: T, b: T) {
    const orderDiff = (a.data.order ?? 999) - (b.data.order ?? 999);
    if (orderDiff !== 0) {
        return orderDiff;
    }

    return (a.data.title ?? a.data.name ?? '').localeCompare(b.data.title ?? b.data.name ?? '');
}
