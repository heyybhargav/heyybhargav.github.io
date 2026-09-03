import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';
import './globals.css';

/**
 * Self-hosted rather than pulled from Google at runtime.
 *
 * The old stylesheet opened with @import url(fonts.googleapis.com/...), which is the
 * slowest way to load a face: the browser has to fetch the stylesheet, parse it, and
 * only then discover there is a font to go and get. next/font inlines the @font-face
 * against a file served from this origin and reserves the metrics, so there is one
 * fewer connection and no reflow when it lands.
 */
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: site.name,
        template: `%s | ${site.name}`,
    },
    description: 'AI operator from IIT Bombay. Product, strategy, and GTM execution.',
    openGraph: {
        type: 'website',
        siteName: site.name,
        title: site.name,
        description: 'AI operator from IIT Bombay. Product, strategy, and GTM execution.',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@heyybhargav',
    },
    alternates: { canonical: '/' },
};

/** Matches the page ground in both schemes, so the bar above the page is never a
 *  different colour from the page under it. */
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#fcfcfc' },
        { media: '(prefers-color-scheme: dark)', color: '#0d0d0f' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <head>
                {/* Runs before the first paint, so a reader who chose the theme opposite
                    to their system setting never sees the wrong one flash first. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
                    }}
                />
            </head>
            <body>
                <main>
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
