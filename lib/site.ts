/**
 * Everything the pages say, in one place.
 *
 * The old site kept this inline across three HTML files, which meant the bio existed
 * twice and the Siftl blurb existed twice, and they drifted. Prose that appears on
 * more than one page lives here now; prose that appears once still lives in its page.
 */

export const site = {
    name: 'Bhargav Chaudhari',
    role: 'AI operator, IIT Bombay',
    url: 'https://heyybhargav.github.io',
    email: 'cbhargav2002@gmail.com',
    linkedin: 'https://linkedin.com/in/bhargavchaudhari',
    x: 'https://x.com/heyybhargav',
    substack: 'https://heyybhargav.substack.com',
} as const;

export type Entry = {
    title: string;
    href?: string;
    meta?: string;
    body: string;
};

export const experience: Entry[] = [
    {
        title: 'Product & GTM, Provue AI (Pazago)',
        href: 'https://provue.ai',
        meta: 'Current',
        body: 'Led product and distribution to scale Provue AI to 300k+ users (Top 100 App Store rank). Built the underlying workflows, agents, and skills, creating a system that let others build agents with any capability, while driving GTM execution.',
    },
    {
        title: 'Investment Analyst, Samarthya Investment Advisors',
        meta: '16 months',
        body: 'Deployed over $8M into 7 deeptech companies. Authored detailed investment memos synthesizing technical diligence and market analysis across GenAI and eVTOLs to drive allocation decisions.',
    },
];

export const education: Entry[] = [
    {
        title: 'Indian Institute of Technology, Bombay',
        meta: '2020–2024',
        body: 'B.S. Economics. Led media and marketing for the Entrepreneurship Cell as Head, and served as Chief Editor for EnSpace magazine.',
    },
    {
        title: 'Life beyond building',
        body: 'Outside work, I read, write, meditate, play guitar, and keep learning.',
    },
];

export type Project = {
    /** Anchor on /projects, and the key the home page cards point at. */
    id: string;
    name: string;
    /** The eyebrow above the name. */
    label: string;
    /** One line under the name on /projects. */
    lead: string;
    /** One line on the home page card. Shorter than the lead on purpose. */
    card: string;
    logo?: string;
    intro: string;
    points: { label: string; body: string }[];
    /** The closing sentence, with its links spliced in where {0}, {1} appear. */
    outro: string;
    links: { href: string; label: string; icon: 'globe' | 'apple' }[];
    /** Home page cards show the featured ones, in this order. */
    featured?: boolean;
};

export const projects: Project[] = [
    {
        id: 'provue',
        name: 'Provue AI',
        label: 'Scale & distribution',
        lead: 'Product & GTM driving 300k+ active users.',
        card: "Scaled Pazago's AI tool to 300k+ users.",
        logo: '/images/logo-provue.svg',
        featured: true,
        intro: 'At Pazago, I directed product and GTM for Provue AI. I built the underlying workflows, agents, and skills, eventually creating a system that let others build agents with any desired capability, and helped scale the product to 300k+ active users.',
        points: [
            {
                label: 'Workflows & agentic systems',
                body: 'built the underlying workflows, agents, and skills, creating a system that let others build agents with any desired capability.',
            },
            {
                label: 'Growth & GTM loops',
                body: 'structured high-performance organic loops that drove 5M+ views through strategic creator integrations and visual content cycles.',
            },
            {
                label: 'Growth infrastructure',
                body: 'implemented precise event tracking and cohort funnels to cut onboarding drop-off.',
            },
        ],
        outro: 'Operating at the frontlines of product and GTM taught me to align user delight with distribution loops from day one. More at {0}.',
        links: [{ href: 'https://provue.ai', label: 'provue.ai', icon: 'globe' }],
    },
    {
        id: 'siftl',
        name: 'Siftl',
        label: 'Solo-built consumer app',
        lead: 'Save it, and it comes back.',
        card: 'A save-anything iPhone app, built and shipped solo.',
        logo: '/images/logo-siftl.svg',
        featured: true,
        intro: 'Siftl is a save-anything app I built and shipped on my own. Share a link, a post, a screenshot, or a PDF from any app on your phone and it lands in one place, cleaned up and readable. Later, it comes back to you without you going looking for it.',
        points: [
            {
                label: 'Share-sheet capture',
                body: 'an iOS share extension that saves articles, videos, podcasts, threads, and screenshots without leaving the app you are in.',
            },
            {
                label: 'Automatic enrichment',
                body: 'titles, authors, artwork, and tags are pulled on save, so there is nothing to file, name, or sort.',
            },
            {
                label: 'Resurfacing',
                body: 'saved items return through a home-screen widget and timed nudges, so the collection stays read rather than stored.',
            },
        ],
        outro: 'Built end to end, from the web app and enrichment pipeline to the native SwiftUI iPhone app. Free on iPhone at {0} and the {1}.',
        links: [
            { href: 'https://siftl.com', label: 'siftl.com', icon: 'globe' },
            { href: 'https://apps.apple.com/app/id6802737505', label: 'App Store', icon: 'apple' },
        ],
    },
    {
        id: 'acharya',
        name: 'Acharya',
        label: 'AI learning companion',
        lead: 'Learn anything from any video, podcast, or lecture.',
        card: 'A personal tutor for online video and audio.',
        intro: 'Acharya acts as a personal tutor for online video and audio. By ingesting YouTube lectures, podcasts, or local audio uploads, it constructs a fully interactive classroom.',
        points: [
            {
                label: 'Content ingestion pipelines',
                body: 'handlers that scrape, transcribe, and index raw YouTube links or direct audio files.',
            },
            {
                label: 'Interactive study loops',
                body: 'context-aware prompting that generates notes, flashcards, quizzes, and Q&A on demand.',
            },
            {
                label: 'Minimalist interface',
                body: 'a clean, lightweight UI focused on video consumption alongside rapid Q&A.',
            },
        ],
        outro: 'Acharya lowers the barrier to active recall from long-form educational video. Try it at {0}.',
        links: [{ href: 'https://myacharya.vercel.app/', label: 'myacharya.vercel.app', icon: 'globe' }],
    },
    {
        id: 'token-revolution',
        name: 'The Token Revolution',
        label: 'Interactive thesis explainer',
        lead: "Ribbit Capital's June 2025 tokenized-economy thesis.",
        card: "An interactive explainer for Ribbit Capital's tokenized-economy thesis.",
        intro: "An interactive explainer synthesizing Ribbit Capital's June 2025 letter. It breaks down the taxonomy of stablecoin settlement pipelines, proprietary data-token factories, and context flywheels.",
        points: [
            {
                label: 'Machine-legibility taxonomy',
                body: 'modeled Access, Memory, Expert, Context, Identity, Knowledge, and Asset tokens.',
            },
            {
                label: 'Interactive data interfaces',
                body: 'reactive charts rendering inference-cost collapses (1,000x over three years) and settlement-volume thresholds.',
            },
            {
                label: 'Gamified retention loops',
                body: 'a client-side quiz testing users on data moats and agentic resource allocation.',
            },
        ],
        outro: 'It maps the transition where vertical token networks dismantle traditional BPO and software ERPs. Explore it at {0}.',
        links: [
            { href: 'https://thetokenrevolution.vercel.app/', label: 'thetokenrevolution.vercel.app', icon: 'globe' },
        ],
    },
];
