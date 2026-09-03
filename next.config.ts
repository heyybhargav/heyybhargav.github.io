import type { NextConfig } from 'next';

/**
 * Static export, because this deploys to GitHub Pages (heyybhargav.github.io),
 * which serves files and nothing else. No server, so no image optimizer either:
 * every image in public/ has to arrive already the right size. scripts/fetch-essays.mjs
 * is what does that.
 *
 * trailingSlash so the export writes projects/index.html rather than projects.html,
 * which is the shape Pages resolves without a redirect.
 */
const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
};

export default nextConfig;
