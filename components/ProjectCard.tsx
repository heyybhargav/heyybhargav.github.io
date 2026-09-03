import Link from 'next/link';
import type { Project } from '@/lib/site';

/**
 * A home page card. The whole rectangle is the target: the anchor holds the content
 * and .stretch throws a transparent layer over the rest of the card, so the hit area
 * matches what the border draws.
 */
export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/projects/#${project.id}`} className="project-card stretch">
            <div className="card-art">
                {project.logo ? (
                    <span className="logo-tile">
                        {/* Fixed 36px, not next/image: these are two small SVGs on a static
                            export, where there is no optimizer to route them through. */}
                        <img src={project.logo} alt="" width={36} height={36} />
                    </span>
                ) : (
                    <span className="logo-tile" aria-hidden>
                        <span style={{ fontSize: 24, fontWeight: 600 }}>{project.name[0]}</span>
                    </span>
                )}
            </div>
            <h3>{project.name}</h3>
            <p>{project.card}</p>
        </Link>
    );
}
