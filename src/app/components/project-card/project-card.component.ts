import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Project } from '../../models/project.model';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgStyle],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() animationDelay: number = 0;

  faExternalLink = faExternalLinkAlt;
  faGithub = faGithub;
  animationStyle: Record<string, string> = {};

  // Map languages to their corresponding image URLs
  languageIconUrls: Record<string, string> = {
    'angular': '/assets/icons/angular-original.svg',
    'react': '/assets/icons/react-original.svg',
    'react native': '/assets/icons/react-original.svg',
    'python': '/assets/icons/python-original.svg',
    'flask': '/assets/icons/flask-original.svg',
    'html': '/assets/icons/html5-original-wordmark.svg',
    'html and css': '/assets/icons/html5-original-wordmark.svg',
    'php': '/assets/icons/php-original.svg',
    'java': '/assets/icons/java-original.svg',
    'javascript': '/assets/icons/javascript-original.svg',
    'typescript': '/assets/icons/typescript-original.svg',
    'css': '/assets/icons/css3-original-wordmark.svg',
    'vue': '/assets/icons/vuejs-original.svg',
    'vue.js': '/assets/icons/vuejs-original.svg',
    'node': '/assets/icons/nodejs-original.svg',
    'node.js': '/assets/icons/nodejs-original.svg',
    'c#': '/assets/icons/csharp-original.svg',
    'visual c#': '/assets/icons/csharp-original.svg',
    'c++': '/assets/icons/cplusplus-original.svg',
    'c': '/assets/icons/c-original.svg',
    'android': '/assets/icons/android-original.svg',
    'spring boot': '/assets/icons/spring-original.svg',
    'spring security': '/assets/icons/spring-original.svg',
    'mysql': '/assets/icons/mysql-original.svg',
    'firebase': '/assets/icons/firebase-original.svg',
    'qt': '/assets/icons/qt-original.svg',
    '.net framework': '/assets/icons/dot-net-original.svg',
    'winforms': '/assets/icons/dot-net-original.svg',
    'scss': '/assets/icons/sass-original.svg',
    'arduino': '/assets/icons/arduino-original.svg'
  };

  ngOnInit() {
    this.animationStyle = {
      'animation-delay': `${this.animationDelay * 0.1}s`
    };
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
    return this.languageIconUrls[techLower] || '/assets/icons/git-original.svg';
  }
}
