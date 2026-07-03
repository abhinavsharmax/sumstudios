'use client';

import Link from 'next/link';
import { Project } from '@/lib/data';
import { MouseEvent, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [shareText, setShareText] = useState('SHARE');

  const handleShare = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const projectUrl = `${window.location.origin}/projects/${project.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: projectUrl,
        });
      } catch (err) {
        copyToClipboard(projectUrl);
      }
    } else {
      copyToClipboard(projectUrl);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setShareText('COPIED!');
    setTimeout(() => {
      setShareText('SHARE');
    }, 2000);
  };

  return (
    <div className="project-card">
      <Link href={`/projects/${project.slug}`} className="project-card__media-link">
        <div className="project-card__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="project-card__img"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      </Link>
      
      <div className="project-card__meta-row">
        <div className="project-card__meta-left">
          <Link href={`/projects/${project.slug}`} className="project-card__title-link">
            <h3 className="project-card__title">{project.title}</h3>
          </Link>
          <span className="project-card__year">{project.year}</span>
        </div>
        
        <div className="project-card__meta-right">
          <Link href={`/projects/${project.slug}`} className="project-card__action">
            OPEN
          </Link>
          <button onClick={handleShare} className="project-card__action">
            {shareText}
          </button>
          <Link href={`/contact?subject=${encodeURIComponent(`Enquiry: ${project.title}`)}`} className="project-card__action">
            CONTACT
          </Link>
        </div>
      </div>
    </div>
  );
}
