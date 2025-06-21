import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faMapMarkerAlt, faBuilding, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface SkillCategory {
  name: string;
  skills: string[];
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
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  skillCategories: SkillCategory[] = [
    {
      name: 'Programming Languages',
      skills: ['C', 'C++', 'C#', 'HTML', 'Java', 'JavaScript', 'TypeScript', 'Kotlin', 'Python', 'SQL']
    },
    {
      name: 'Styling',
      skills: ['CSS', 'SASS', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI']
    },
    {
      name: 'Frameworks & Libraries',
      skills: ['Angular', 'Django', 'Flask', 'Jetpack Compose', 'JUnit', 'Maven', 'Qt', 'React', 'React Native', 'Spring', 'Spring Boot']
    },
    {
      name: 'IDEs',
      skills: ['Android Studio', 'Arduino IDE', 'JetBrains IDEs', 'Visual Studio', 'Visual Studio Code']
    },
    {
      name: 'Tools',
      skills: ['Bitbucket', 'Confluence', 'Docker', 'Git', 'DVC', 'DagsHub','GitHub Actions', 'Jenkins', 'Jira', 'Jfrog Artifactory', 'Microsoft Office', 'Postman', 'Slack']
    },
    {
      name: 'Platforms',
      skills: ['Firebase', 'GitHub Pages', 'Google Cloud Platform (GCP)', 'Google Play Console', 'Heroku', 'Netlify', 'Render']
    },
    {
      name: 'Testing',
      skills: ['Appium', 'AssertJ', 'Mockito', 'Robot Framework', 'Selenium']
    }
  ];
  protected readonly faPhone = faPhone;
}
