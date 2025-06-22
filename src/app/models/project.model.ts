export interface Project {
  name: string;
  description: string;
  technologies: string[];  // Changed from language to technologies array
  repoUrl?: string;
  previewUrl?: string;  // Optional URL for live preview
}
