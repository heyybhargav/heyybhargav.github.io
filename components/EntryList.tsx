import type { Entry } from '@/lib/site';
import { ExternalIcon } from './Icons';

/**
 * The stacked rows used for experience and education: a title, an optional date on the
 * right, and a paragraph. Where a title has a destination it becomes a link and grows
 * an arrow on hover, which is where the old markup put it too.
 */
export function EntryList({ entries }: { entries: Entry[] }) {
    return (
        <div className="entry-list">
            {entries.map((entry) => (
                <div className="entry" key={entry.title}>
                    <div className="entry-head">
                        <h3>
                            {entry.href ? (
                                <a href={entry.href} target="_blank" rel="noopener noreferrer">
                                    {entry.title}
                                    <ExternalIcon className="ext" />
                                </a>
                            ) : (
                                entry.title
                            )}
                        </h3>
                        {entry.meta ? <span className="meta">{entry.meta}</span> : null}
                    </div>
                    <p>{entry.body}</p>
                </div>
            ))}
        </div>
    );
}
