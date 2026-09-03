/**
 * Pulls the Substack feed and leaves behind two things the build can use offline:
 * data/essays.json, and a 96px cover for each post in public/images/essays.
 *
 * It runs as `prebuild`, and the deploy workflow also runs it on a daily schedule.
 * That is what "the site updates itself when I publish" means on GitHub Pages: there
 * is no server to ask at request time, so the answer has to be baked in and the bake
 * has to be re-run.
 *
 * Nothing here is allowed to fail the build. Substack being down, a cover image
 * 404ing, no network at all: each of those falls back to whatever is already
 * committed, which is why data/essays.json and the images are in git rather than
 * gitignored. A build with a stale list beats a build that does not happen.
 */
import { writeFile, readFile, mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FEED = 'https://heyybhargav.substack.com/feed';
const OUT_JSON = join(ROOT, 'data', 'essays.json');
const IMG_DIR = join(ROOT, 'public', 'images', 'essays');

/** The list page shows a handful and links out for the rest. */
const KEEP = 8;
/** Rendered at 46px. Two of those for retina. */
const THUMB = 96;

/**
 * Enough of an RSS reader for one known feed.
 *
 * A parser dependency would buy correctness against feeds we do not control, and we
 * control this one. Substack wraps every field we want in CDATA except pubDate and
 * the enclosure, so the two shapes below cover it.
 */
function parse(xml) {
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items.map((item) => {
        const tag = (name) => {
            const m = item.match(
                new RegExp(`<${name}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`)
            );
            return m ? m[1].trim() : '';
        };
        const cover = item.match(/<enclosure[^>]*url="([^"]+)"/);
        return {
            title: decode(tag('title')),
            subtitle: decode(tag('description')),
            url: tag('link'),
            date: tag('pubDate'),
            cover: cover ? cover[1] : '',
        };
    });
}

/** Substack numeric-escapes punctuation inside CDATA, so smart quotes arrive as entities. */
function decode(s) {
    return s
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&apos;/g, "'");
}

function slugOf(url) {
    return (url.split('/p/')[1] ?? url).replace(/[^a-z0-9-]/gi, '').slice(0, 80) || 'post';
}

async function exists(p) {
    try {
        await access(p);
        return true;
    } catch {
        return false;
    }
}

/**
 * Square-crops the cover to a thumbnail, once. Substack serves these at their full
 * upload size (the current lead post's is 2.1MB), and the design puts them in a 46px
 * circle-radius square, so fetching the original at render time would ship half a
 * megabyte per row to draw a thumbnail.
 *
 * Skipped when the file is already there, so a rebuild costs one RSS request.
 */
async function thumbnail(cover, slug) {
    const rel = `/images/essays/${slug}.webp`;
    const abs = join(IMG_DIR, `${slug}.webp`);
    if (await exists(abs)) return rel;
    if (!cover) return '';
    try {
        const res = await fetch(cover);
        if (!res.ok) throw new Error(`${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        await sharp(buf)
            .resize(THUMB, THUMB, { fit: 'cover', position: 'attention' })
            .webp({ quality: 82 })
            .toFile(abs);
        return rel;
    } catch (err) {
        console.warn(`  cover skipped for ${slug}: ${err.message}`);
        return '';
    }
}

async function main() {
    await mkdir(IMG_DIR, { recursive: true });

    let xml;
    try {
        const res = await fetch(FEED, { headers: { 'user-agent': 'heyybhargav.github.io build' } });
        if (!res.ok) throw new Error(`feed responded ${res.status}`);
        xml = await res.text();
    } catch (err) {
        console.warn(`essays: ${err.message}. Keeping the committed list.`);
        return;
    }

    const parsed = parse(xml).filter((p) => p.title && p.url).slice(0, KEEP);
    if (!parsed.length) {
        console.warn('essays: feed parsed to nothing. Keeping the committed list.');
        return;
    }

    const essays = [];
    for (const post of parsed) {
        const slug = slugOf(post.url);
        essays.push({
            title: post.title,
            subtitle: post.subtitle,
            url: post.url,
            date: post.date ? new Date(post.date).toISOString().slice(0, 10) : '',
            thumb: await thumbnail(post.cover, slug),
        });
    }

    const next = JSON.stringify(essays, null, 2) + '\n';
    const prev = await readFile(OUT_JSON, 'utf8').catch(() => '');
    if (next === prev) {
        console.log(`essays: ${essays.length} posts, unchanged.`);
        return;
    }
    await writeFile(OUT_JSON, next);
    console.log(`essays: wrote ${essays.length} posts.`);
}

main().catch((err) => {
    // Still not fatal. Same reasoning as above.
    console.warn(`essays: ${err.message}. Keeping the committed list.`);
});
