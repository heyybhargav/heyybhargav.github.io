'use client';

import { useRef } from 'react';

/**
 * Three states, two of which are the same button.
 *
 * Untouched, the page follows the system. Pressed, it writes a choice to localStorage
 * and stamps data-theme on <html>, which the palette blocks in globals.css read ahead
 * of the media query. That choice then survives a reload, including on a machine set
 * the other way.
 *
 * Nothing about the current theme is held in React state. Which icon shows is decided
 * in CSS from the same two signals the palette uses, so the button is correct in the
 * HTML that arrives rather than after hydration.
 */
export function ThemeToggle() {
    const button = useRef<HTMLButtonElement>(null);

    function apply(next: 'dark' | 'light') {
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch {
            // Private mode, or storage disabled. The theme still changes for this page.
        }
    }

    function toggle() {
        const root = document.documentElement;
        const chosen = root.getAttribute('data-theme');
        const current =
            chosen ??
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const next = current === 'dark' ? 'light' : 'dark';

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced || !document.startViewTransition || !button.current) {
            apply(next);
            return;
        }

        /**
         * The circle grows from the button, not from the pointer. Keyboard activation
         * reports a click at 0,0, which would send the wave out of the top-left corner
         * of the screen for anyone tabbing to it.
         */
        const box = button.current.getBoundingClientRect();
        const x = box.left + box.width / 2;
        const y = box.top + box.height / 2;
        /** Reach the furthest corner, or the last thing to change is a screen edge. */
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        /**
         * Marks the document for the duration, so the clip-path rules in globals.css
         * apply here and leave the cross-document navigation transition alone. Both use
         * ::view-transition-*(root) and they want opposite things.
         */
        root.setAttribute('data-theme-switching', '');

        const transition = document.startViewTransition(() => apply(next));

        transition.ready
            .then(() => {
                root.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${radius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration: 450,
                        /**
                         * Grows at a legible rate. The first curve here was the site's
                         * own --ease, cubic-bezier(0.16, 1, 0.3, 1), which is right for
                         * a 3px hover nudge and wrong for this: it put the circle at
                         * 49% of its final radius after 52ms and 97% by halfway. Two
                         * things follow from that, and both were reported. The origin
                         * is never visible, because the circle is half the screen
                         * before the eye lands on it, so it does not read as coming
                         * from the button. And the back half of the animation crawls
                         * through the last 3% of the growth, which is also the most
                         * expensive stretch to repaint, so it reads as a stall.
                         *
                         * This one is at 19% by a fifth of the way in and 79% by
                         * halfway. Slower to leave, and it arrives.
                         */
                        easing: 'cubic-bezier(0.33, 0, 0.2, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
            })
            .catch(() => {
                // A transition can be skipped, e.g. another one starts first. The theme
                // is already applied by then; only the animation is lost.
            });

        transition.finished.finally(() => root.removeAttribute('data-theme-switching'));
    }

    return (
        <button
            ref={button}
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label="Switch theme"
        >
            <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
            <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
        </button>
    );
}
