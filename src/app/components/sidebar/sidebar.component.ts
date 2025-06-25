import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faMapMarkerAlt, faBuilding, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { LazyLoadDirective } from '@app/directives/lazy-load.directive';
import { AssetService } from '@app/services/asset.service';

interface SkillCategory {
  name: string;
  skills: string[];
  isExpanded: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, LazyLoadDirective],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faMapMarker = faMapMarkerAlt;
  faBuilding = faBuilding;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  // Profile image paths
  profileImageSrc: string;
  profileImagePlaceholder: string;

  constructor(private assetService: AssetService) {
    this.profileImageSrc = this.assetService.getProfileImage('profile-optimized.jpeg', false);
    this.profileImagePlaceholder = this.assetService.getProfileImage('profile-optimized.jpeg', false);
  }

  skillCategories: SkillCategory[] = [
    {
      name: 'Programming Languages',
      skills: ['Java', 'Python', 'Kotlin', 'C', 'C++', 'C#', 'HTML', 'JavaScript', 'TypeScript', 'SQL'],
      isExpanded: false
    },
    {
      name: 'Styling',
      skills: ['CSS', 'SASS', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI'],
      isExpanded: false
    },
    {
      name: 'Frameworks & Libraries',
      skills: ['Angular', 'Jetpack Compose', 'Spring', 'Spring Boot', 'Django', 'Flask', 'Maven', 'Qt', 'React', 'React Native'],
      isExpanded: false
    },
    {
      name: 'IDEs',
      skills: ['JetBrains IDE Tools', 'Android Studio', 'Arduino IDE', 'Visual Studio', 'Visual Studio Code', 'RIDE'],
      isExpanded: false
    },
    {
      name: 'Tools',
      skills: ['Git', 'Jira', 'Postman', 'Docker', 'Bitbucket', 'Jenkins', 'Confluence', 'DVC', 'DagsHub', 'GitHub Actions', 'Jfrog Artifactory', 'Microsoft Office', 'Slack'],
      isExpanded: false
    },
    {
      name: 'Platforms',
      skills: ['Firebase', 'Netlify', 'Google Play Console', 'Vercel', 'Render', 'GitHub Pages', 'Google Cloud Platform (GCP)', 'Google Search Platform (GCP)', 'Heroku'],
      isExpanded: false
    },
    {
      name: 'Testing',
      skills: ['Appium', 'Robot Framework', 'Mockito', 'AssertJ', 'Selenium', 'JUnit'],
      isExpanded: false
    }
  ];

  /**
   * Toggles the expansion state of a skill category
   * @param category The skill category to toggle
   */
  toggleCategoryExpansion(category: SkillCategory): void {
    category.isExpanded = !category.isExpanded;
  }

  /**
   * Gets the visible skills for a category based on expansion state
   * @param category The skill category
   * @returns Array of visible skills
   */
  getVisibleSkills(category: SkillCategory): string[] {
    return category.isExpanded ? category.skills : category.skills.slice(0, 3);
  }

  /**
   * Gets the count of hidden skills for a category
   * @param category The skill category
   * @returns Number of hidden skills when collapsed
   */
  getSkillCount(category: SkillCategory): number {
    return category.skills.length - 3 > 0 ? category.skills.length - 3 : 0;
  }
}
