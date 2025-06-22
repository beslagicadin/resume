import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss']
})
export class ExperienceSectionComponent {
  isCollapsed = true;

  experiences = [
    {
      title: 'Software Engineer',
      company: 'Resonate d.o.o. Tuzla',
      companyLink: 'https://www.linkedin.com/company/resonatebh',
      period: 'Dec 2024 - Present',
      description: 'Working on development and maintenance of web and mobile applications using modern technologies. Remote position.'
    },
    {
      title: 'Assistant Professor',
      company: 'Internacionalna poslovno-informaciona akademija Tuzla',
      companyLink: 'https://ipi-akademija.ba/',
      period: 'Oct 2024 - Present',
      description: 'Teaching computer science and programming related courses.'
    },
    {
      title: 'Founder & Course Curator',
      company: 'Think Big Academy',
      companyLink: 'https://thinkbigacademy.net',
      period: 'Nov 2023 - Present',
      description: 'Founded and managing educational platform focused on technology and programming courses.'
    },
    {
      title: 'Software Engineer',
      company: 'Asseco South Eastern Europe',
      companyLink: 'https://see.asseco.com/',
      period: 'Apr 2023 - Dec 2024',
      description: 'Developed and maintained software solutions for clients in the South Eastern Europe region.'
    },
    {
      title: 'Junior Software Engineer',
      company: 'Asseco South Eastern Europe',
      companyLink: 'https://see.asseco.com/',
      period: 'Sep 2021 - Apr 2023',
      description: 'Worked on software development projects and collaborated with senior team members.'
    },
    {
      title: 'Software Engineer Intern',
      company: 'Infobip',
      companyLink: 'https://www.infobip.com/',
      period: 'Jul 2021 - Aug 2021',
      description: 'Completed a 2-month on-site internship working with software development teams.'
    }
  ];

  get visibleExperiences() {
    return this.isCollapsed ? this.experiences.slice(0, 3) : this.experiences;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
