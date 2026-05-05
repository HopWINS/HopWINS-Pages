export function stripContentExtension(id: string) {
    return id.replace(/\.(md|mdx|json)$/i, '');
}

export function entrySlug(entry: { id: string }) {
    return stripContentExtension(entry.id).replace(/\\/g, '/');
}

export function stripOrderPrefix(segment: string) {
    return segment.replace(/^\d+[-_]/, '');
}

export function orderedFolderRoute(entry: { id: string }) {
    const parts = entrySlug(entry).split('/').map(stripOrderPrefix).filter(Boolean);

    if (parts.at(-1) === 'index') {
        parts.pop();
    }

    return parts.join('/');
}

export function orderedContentDirectoryRoute(entry: { id: string }) {
    const parts = entrySlug(entry).split('/').map(stripOrderPrefix).filter(Boolean);
    parts.pop();

    return parts.join('/');
}

export function isFolderIndex(entry: { id: string }) {
    return entrySlug(entry).endsWith('/index') || entrySlug(entry) === 'index';
}

export function byOrderThenTitle<T extends { data: { order?: number; title?: string; name?: string } }>(a: T, b: T) {
    const orderDiff = (a.data.order ?? 999) - (b.data.order ?? 999);
    if (orderDiff !== 0) {
        return orderDiff;
    }

    return (a.data.title ?? a.data.name ?? '').localeCompare(b.data.title ?? b.data.name ?? '');
}

export function byNewestDate<T extends { data: { date: Date } }>(a: T, b: T) {
    return b.data.date.getTime() - a.data.date.getTime();
}

export function yearFromDate(date: Date) {
    return date.getUTCFullYear();
}
