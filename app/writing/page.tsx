import type { Metadata } from 'next';
import { PostList, type Essay } from '@/components/PostList';
import { SubscribeForm } from '@/components/SubscribeForm';
import { SubstackIcon } from '@/components/Icons';
import { site } from '@/lib/site';
import essays from '@/data/essays.json';
import { TopNav } from '@/components/TopNav';

export const metadata: Metadata = {
    title: 'Writing',
    description: 'Essays on AI, growth, execution, and mastery by Bhargav Chaudhari.',
    alternates: { canonical: '/writing/' },
};

/**
 * The list is read from data/essays.json, which scripts/fetch-essays.mjs rewrites from
 * the Substack feed before every build. Read at build, not at request: there is no
 * request, this whole site is files on GitHub Pages. The deploy workflow runs on a
 * daily schedule for exactly this reason.
 */
export default function Writing() {
    return (
        <>
            <TopNav active="writing" />

            <header>
                <h1 className="page-title">Writing</h1>
                <div className="prose">
                    <p>
                        I publish{' '}
                        <a href={site.substack} target="_blank" rel="noopener noreferrer" className="ilink">
                            <SubstackIcon />Growth Gazette
                        </a>
                        , a newsletter on mastery, business operations, and the long-term impact of AI.
                    </p>
                </div>
            </header>

            <section id="newsletter">
                <h2 className="section-label">Newsletter</h2>
                <p className="section-lead">
                    I write about the small aspects of life with a whole new perspective. The
                    purpose is simple: cut the clutter and get clarity.
                </p>
                <SubscribeForm />
            </section>

            <section id="archive">
                <h2 className="section-label">All essays</h2>
                <PostList essays={essays as Essay[]} />
                <a href={site.substack} target="_blank" rel="noopener noreferrer" className="more-link">
                    Read more on Substack <span className="arr" aria-hidden>→</span>
                </a>
            </section>
        </>
    );
}
