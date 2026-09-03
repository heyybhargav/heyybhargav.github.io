import Link from 'next/link';
import { EntryList } from '@/components/EntryList';
import { ProjectCard } from '@/components/ProjectCard';
import { MailIcon, LinkedInIcon, XIcon, GlobeIcon } from '@/components/Icons';
import { education, experience, projects, site } from '@/lib/site';
import { TopNav } from '@/components/TopNav';

const featured = projects.filter((project) => project.featured);

export default function Home() {
    return (
        <>
            <TopNav active="home" />

            <header>
                <div className="profile">
                    {/* 104px source for a 52px slot. The old site shipped a 1.6MB PNG here,
                        which was the single heaviest thing on the page and it was drawing a
                        circle the width of a thumbnail. */}
                    <img
                        src="/images/photo.webp"
                        alt=""
                        className="profile-avatar"
                        width={52}
                        height={52}
                        fetchPriority="high"
                    />
                    <div>
                        <h1 className="profile-name">{site.name}</h1>
                        <div className="profile-role">{site.role}</div>
                    </div>
                </div>

                <div className="prose">
                    <p>
                        I&apos;m an IIT Bombay Economics graduate working across VC and startups. I take
                        ideas from 0 to 1, mostly because it keeps satisfying my curiosity. Right now I
                        lead product and GTM at{' '}
                        <a href="https://provue.ai" target="_blank" rel="noopener noreferrer" className="ilink">
                            <GlobeIcon />Provue AI
                        </a>
                        .
                    </p>
                    <p>
                        Reach me at{' '}
                        <a href={`mailto:${site.email}`} className="ilink">
                            <MailIcon />email
                        </a>
                        , on{' '}
                        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="ilink">
                            <LinkedInIcon />LinkedIn
                        </a>
                        , or{' '}
                        <a href={site.x} target="_blank" rel="noopener noreferrer" className="ilink">
                            <XIcon />X
                        </a>
                        .
                    </p>
                </div>
            </header>

            <section id="experience">
                <h2 className="section-label">Experience</h2>
                <EntryList entries={experience} />
            </section>

            <section id="projects">
                <h2 className="section-label">Featured work</h2>
                <div className="project-grid">
                    {featured.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                <Link href="/projects/" className="more-link">
                    Explore all projects <span className="arr" aria-hidden>→</span>
                </Link>
            </section>

            <section id="life-education">
                <h2 className="section-label">Beyond the work</h2>
                <EntryList entries={education} />
            </section>
        </>
    );
}
