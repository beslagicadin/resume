import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Project } from '@app/models/project.model';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { AssetService } from '../../services/asset.service';

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

  constructor(private assetService: AssetService) {}

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
   * Gets the image URL for a language using AssetService
   * @param technology The programming language/technology
   * @returns The corresponding image URL
   */
  getLanguageIconUrl(technology: string): string {
    return this.assetService.getTechnologyIcon(technology);
  }
}
