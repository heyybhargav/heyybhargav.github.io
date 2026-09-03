import { site } from '@/lib/site';

export function Footer() {
    return (
        <footer className="site-footer">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <div className="foot-links">
                <a href={`mailto:${site.email}`}>Email</a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={site.x} target="_blank" rel="noopener noreferrer">X</a>
            </div>
        </footer>
    );
}
