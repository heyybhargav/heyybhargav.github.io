import Link from 'next/link';

const pages = [
    { key: 'home', href: '/', label: 'Home' },
    { key: 'projects', href: '/projects/', label: 'Projects' },
    { key: 'writing', href: '/writing/', label: 'Writing' },
] as const;

export type NavKey = (typeof pages)[number]['key'];

/**
 * Each page states which one it is, rather than the nav reading the URL.
 *
 * usePathname would be the obvious way and it was the first way, but it makes this a
 * client component, and a client component in the root layout drags the client runtime
 * onto every page to decide which of three links gets an underline. Three pages, each
 * of which knows its own name at build time. So they say.
 */
export function TopNav({ active }: { active: NavKey }) {
    return (
        <nav className="topnav" aria-label="Pages">
            {pages.map((page) => (
                <Link
                    key={page.key}
                    href={page.href}
                    className={page.key === active ? 'active' : undefined}
                    aria-current={page.key === active ? 'page' : undefined}
                >
                    {page.label}
                </Link>
            ))}
        </nav>
    );
}
