import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { IconLink } from '@/components/IconLink';
import { projects, type Project } from '@/lib/site';
import { TopNav } from '@/components/TopNav';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Product, growth, and solo-built software by Bhargav Chaudhari.',
    alternates: { canonical: '/projects/' },
};

/**
 * Splices a project's links into its closing sentence at the {0}, {1} placeholders,
 * so the copy stays one readable string in lib/site.ts instead of being cut into
 * fragments around its anchors.
 */
function outroWithLinks(project: Project): ReactNode[] {
    return project.outro.split(/(\{\d\})/).map((part, i) => {
        const slot = part.match(/^\{(\d)\}$/);
        if (!slot) return part;
        const link = project.links[Number(slot[1])];
        if (!link) return null;
        return (
            <IconLink key={i} href={link.href} icon={link.icon}>
                {link.label}
            </IconLink>
        );
    });
}

export default function Projects() {
    return (
        <>
            <TopNav active="projects" />

            <header>
                <h1 className="page-title">Projects</h1>
                <div className="prose">
                    <p>
                        From technical SaaS backends to organic distribution engines. Four I keep coming
                        back to:
                    </p>
                </div>
            </header>

            {projects.map((project) => (
                <section id={project.id} key={project.id}>
                    <div className="section-label">{project.label}</div>
                    <h2 className="section-statement">{project.name}</h2>
                    <p className="section-lead">{project.lead}</p>

                    <div className="detail">
                        <p>{project.intro}</p>
                        <ul>
                            {project.points.map((point) => (
                                <li key={point.label}>
                                    <strong>{point.label}:</strong> {point.body}
                                </li>
                            ))}
                        </ul>
                        <p>{outroWithLinks(project)}</p>
                    </div>
                </section>
            ))}
        </>
    );
}
