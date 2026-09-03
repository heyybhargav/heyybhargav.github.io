import { ChevronIcon } from './Icons';

export type Essay = {
    title: string;
    subtitle: string;
    url: string;
    date: string;
    thumb: string;
};

/** Written out rather than toLocaleDateString, so the server and the browser cannot
 *  disagree about a locale and trip hydration. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(iso: string) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return '';
    return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function PostList({ essays }: { essays: Essay[] }) {
    return (
        <div className="post-list">
            {essays.map((essay) => (
                <a
                    key={essay.url}
                    href={essay.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-row"
                >
                    {essay.thumb ? (
                        <img
                            src={essay.thumb}
                            className="post-thumb"
                            width={46}
                            height={46}
                            loading="lazy"
                            decoding="async"
                            alt=""
                        />
                    ) : (
                        <span className="post-thumb" aria-hidden />
                    )}
                    <div className="post-body">
                        <div className="post-title">{essay.title}</div>
                        <div className="post-meta">{formatDate(essay.date)}</div>
                    </div>
                    <ChevronIcon className="chev" />
                </a>
            ))}
        </div>
    );
}
