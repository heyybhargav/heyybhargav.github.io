import type { ReactNode } from 'react';
import { AppleIcon, GlobeIcon } from './Icons';

const icons = {
    globe: GlobeIcon,
    apple: AppleIcon,
} as const;

export type IconName = keyof typeof icons;

/**
 * An outbound link with its mark inline: the pattern used everywhere prose names a
 * destination. The icon is decorative, so it carries no label of its own; the link
 * text is the label.
 */
export function IconLink({ href, icon, children }: { href: string; icon: IconName; children: ReactNode }) {
    const Icon = icons[icon];
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="ilink">
            <Icon />
            {children}
        </a>
    );
}
