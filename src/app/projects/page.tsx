import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected architectural works by Sum Studio — residential, cultural, commercial and civic projects across India and beyond.',
};

export default function ProjectsPage() {
  return (
    <ProjectsClient projects={PROJECTS} />
  );
}
