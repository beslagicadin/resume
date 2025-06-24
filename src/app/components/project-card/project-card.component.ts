import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Project } from '../../models/project.model';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgStyle, LazyLoadDirective],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() animationDelay: number = 0;

  faExternalLink = faExternalLinkAlt;
  faGithub = faGithub;
  animationStyle: Record<string, string> = {};
  basePath: string = '';

  // Map languages to their corresponding image URLs
  languageIconUrls: Record<string, string> = {
    'angular': '/assets/icons/angular.svg',
    'react': '/assets/icons/react.svg',
    'react native': '/assets/icons/react.svg',
    'python': '/assets/icons/python.svg',
    'flask': '/assets/icons/flask.svg',
    'html': '/assets/icons/html5-wordmark.svg',
    'html and css': '/assets/icons/html5-wordmark.svg',
    'php': '/assets/icons/php.svg',
    'java': '/assets/icons/java.svg',
    'javascript': '/assets/icons/javascript.svg',
    'typescript': '/assets/icons/typescript.svg',
    'css': '/assets/icons/css3-wordmark.svg',
    'vue': '/assets/icons/vuejs.svg',
    'vue.js': '/assets/icons/vuejs.svg',
    'node': '/assets/icons/nodejs.svg',
    'node.js': '/assets/icons/nodejs.svg',
    'c#': '/assets/icons/csharp.svg',
    'visual c#': '/assets/icons/csharp.svg',
    'c++': '/assets/icons/cplusplus.svg',
    'c': '/assets/icons/c.svg',
    'android': '/assets/icons/android.svg',
    'spring boot': '/assets/icons/spring.svg',
    'spring security': '/assets/icons/spring.svg',
    'mysql': '/assets/icons/mysql.svg',
    'firebase': '/assets/icons/firebase.svg',
    'qt': '/assets/icons/qt.svg',
    '.net framework': '/assets/icons/dot-net.svg',
    'winforms': '/assets/icons/dot-net.svg',
    'scss': '/assets/icons/sass.svg',
    'arduino': '/assets/icons/arduino.svg'
  };

  ngOnInit() {
    this.animationStyle = {
      'animation-delay': `${this.animationDelay * 0.1}s`
    };

    // Get the base path from the base href tag
    const baseTag = document.querySelector('base');
    if (baseTag && baseTag.getAttribute('href')) {
      // Remove trailing slash if present
      this.basePath = baseTag.getAttribute('href')!.replace(/\/$/, '');
    }
  }

  /**
   * Converts a language name to a CSS class name
   * Maps languages from project list to corresponding CSS classes
   */
  getLanguageClass(language: string): string {
    const languageLower = language.toLowerCase();

    // Map of languages to CSS classes
    const languageMap: Record<string, string> = {
      'react native': 'react-native',
      'html and css': 'html-and-css',
      'visual c#': 'visual-csharp',
      'c#': 'csharp',
      'c++': 'cpp',
      'angular': 'angular',
      'python': 'python',
      'php': 'php',
      'java': 'java',
      'c': 'c',
      'spring boot': 'spring',
      'spring security': 'spring',
      'mysql': 'mysql',
      'firebase': 'firebase',
      'qt': 'qt',
      '.net framework': 'dotnet',
      'winforms': 'dotnet',
      'flask': 'flask',
      'rest api': 'rest-api',
      'scss': 'scss',
      'data analysis': 'data-analysis',
      'jira api': 'jira'
    };

    const result = languageMap[languageLower] || languageLower.replace(/[^a-z0-9]+/g, '-');
    // console.log(`Mapped to class: "${result}"`);
    return result;
  }

  /**
   * Gets the image URL for a language
   * @param language The programming language
   * @returns The corresponding image URL or a default code icon URL
   */
  getLanguageIconUrl(technology: string): string {
    const techLower = technology.toLowerCase();
    // Return a default git icon if the technology is not found in our map
    const iconPath = this.languageIconUrls[techLower] || '/assets/icons/git.svg';
    
    // If the path starts with '/' and we have a base path, prepend the base path
    if (iconPath.startsWith('/') && this.basePath) {
      return `${this.basePath}${iconPath}`;
    }
    
    return iconPath;
  }
}
