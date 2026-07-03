import Link from 'next/link';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <div className="project-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="project-card__img"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
      <p className="project-card__label label">{project.category}</p>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__sub">{project.location}&nbsp;&nbsp;·&nbsp;&nbsp;{project.year}</p>
    </Link>
  );
}
