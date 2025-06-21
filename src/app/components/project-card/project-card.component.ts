import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Project } from '../../models/project.model';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
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
  animationStyle: Record<string, string> = {};

  // Map languages to their corresponding image URLs
  languageIconUrls: Record<string, string> = {
    'angular': 'https://res.cloudinary.com/rangle/image/upload/q_auto,f_auto/rangle.io/mrigk1uezwyxxftiewxg.png',
    'react': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    'react native': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    'python': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    'flask': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg',
    'html': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
    'html and css': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
    'php': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
    'java': 'https://raw.githubusercontent.com/gilbarbara/logos/cf1dcda31feaae79d0b0efa5218aa0baa11b2f94/logos/java.svg',
    'javascript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    'typescript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    'css': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
    'vue': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
    'vue.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
    'node': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    'node.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    'c#': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
    'visual c#': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
    'c++': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
    'c': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
    'android': 'https://raw.githubusercontent.com/gilbarbara/logos/cf1dcda31feaae79d0b0efa5218aa0baa11b2f94/logos/android-vertical.svg',
    'spring boot': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg',
    'spring security': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg',
    'mysql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
    'firebase': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg',
    'qt': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/qt/qt-original.svg',
    '.net framework': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg',
    'winforms': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg',
    'scss': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',
    'arduino': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg'
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
    return this.languageIconUrls[techLower] || 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg';
  }
}
