/**
 * The site's icons, inline.
 *
 * Inline because there are nine of them and they are each a few hundred bytes: a
 * sprite sheet or an icon package would both cost a request to save nothing. Sized by
 * CSS at every call site, so none of them carry width or height.
 */

type IconProps = { className?: string };

/** Stroked icons share these. Fill-based marks (the logos) set their own. */
const stroke = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    'aria-hidden': true,
} as const;

export function GlobeIcon(props: IconProps) {
    return (
        <svg {...stroke} {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
    );
}

export function AppleIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden {...props}>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
    );
}

export function MailIcon(props: IconProps) {
    return (
        <svg {...stroke} {...props}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    );
}

export function LinkedInIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

export function XIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export function SubstackIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812H22.54V24l-10.54-5.91L1.46 24V10.812zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
    );
}

/** The arrow that appears on a job title hover. */
export function ExternalIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden {...props}>
            <path d="M7 17 17 7M9 7h8v8" />
        </svg>
    );
}

export function ChevronIcon(props: IconProps) {
    return (
        <svg {...stroke} {...props}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
