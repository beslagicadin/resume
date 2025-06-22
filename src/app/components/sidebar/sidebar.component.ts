import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faMapMarkerAlt, faBuilding, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface SkillCategory {
  name: string;
  skills: string[];
  isExpanded: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
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
  
  skillCategories: SkillCategory[] = [
    {
      name: 'Programming Languages',
      skills: ['C', 'C++', 'C#', 'HTML', 'Java', 'JavaScript', 'TypeScript', 'Kotlin', 'Python', 'SQL'],
      isExpanded: false
    },
    {
      name: 'Styling',
      skills: ['CSS', 'SASS', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI'],
      isExpanded: false
    },
    {
      name: 'Frameworks & Libraries',
      skills: ['Angular', 'Django', 'Flask', 'Jetpack Compose', 'JUnit', 'Maven', 'Qt', 'React', 'React Native', 'Spring', 'Spring Boot'],
      isExpanded: false
    },
    {
      name: 'IDEs',
      skills: ['Android Studio', 'Arduino IDE', 'JetBrains IDEs', 'Visual Studio', 'Visual Studio Code'],
      isExpanded: false
    },
    {
      name: 'Tools',
      skills: ['Bitbucket', 'Confluence', 'Docker', 'Git', 'DVC', 'DagsHub','GitHub Actions', 'Jenkins', 'Jira', 'Jfrog Artifactory', 'Microsoft Office', 'Postman', 'Slack'],
      isExpanded: false
    },
    {
      name: 'Platforms',
      skills: ['Firebase', 'GitHub Pages', 'Google Cloud Platform (GCP)', 'Google Play Console', 'Heroku', 'Netlify', 'Render'],
      isExpanded: false
    },
    {
      name: 'Testing',
      skills: ['Appium', 'AssertJ', 'Mockito', 'Robot Framework', 'Selenium'],
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
