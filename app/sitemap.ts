import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return ['/', '/projects/', '/writing/'].map((path) => ({
        url: `${site.url}${path}`,
        lastModified: now,
    }));
}
