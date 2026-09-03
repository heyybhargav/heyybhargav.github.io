import { site } from '@/lib/site';

/**
 * Hands the address to Substack rather than pretending to take it.
 *
 * What stood here was an iframe of Substack's embed, cropped to a hardcoded 280px to
 * cut off their branding and composited with mix-blend-mode: multiply to fake a
 * transparent background on a frame we cannot style. It worked, and it was load-bearing
 * on two things that were never going to hold: their embed staying exactly that tall,
 * and the page never having a dark background.
 *
 * A static export cannot POST anywhere, and Substack's subscribe endpoint refuses
 * cross-origin requests, so a form that claimed success here would be claiming it
 * without knowing. Instead the address is carried to Substack's own subscribe page,
 * prefilled, where the confirmation is real. Submitting with the field empty is fine:
 * it lands on the same page with nothing filled in.
 */
export function SubscribeForm() {
    return (
        <>
            <form
                className="subscribe"
                action={`${site.substack}/subscribe`}
                method="get"
                target="_blank"
                rel="noopener noreferrer"
            >
                <label htmlFor="subscribe-email" className="sr-only">
                    Email address
                </label>
                <input
                    id="subscribe-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                />
                <button type="submit">
                    Subscribe <span className="arr" aria-hidden>→</span>
                </button>
            </form>
            <p className="subscribe-note">Free. Confirmation happens on Substack.</p>
        </>
    );
}
