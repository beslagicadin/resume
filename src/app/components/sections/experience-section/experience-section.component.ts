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
      description: 'Working on development, testing and maintenance of mobile applications and SDKs using modern technologies.'
    },
    {
      title: 'Assistant Professor',
      company: 'Internacionalna poslovno-informaciona akademija Tuzla',
      companyLink: 'https://ipi-akademija.ba/',
      period: 'Oct 2024 - Present',
      description: 'Teaching Java, web and Android programming related courses.'
    },
    {
      title: 'Founder & Course Curator',
      company: 'Think Big Academy',
      companyLink: 'https://thinkbigacademy.net',
      period: 'Nov 2023 - Present',
      description: 'Founded and managing educational platform focused on STEM, new technologies and programming courses for youth.'
    },
    {
      title: 'Software Engineer',
      company: 'Asseco South Eastern Europe',
      companyLink: 'https://see.asseco.com/',
      period: 'Sep 2021 - Dec 2024',
      description: 'Developed and maintained mobile software solutions for banking services. Worked on various technologies, ranging from mobile development to backend services. Implemented new features and optimized existing code for performance, scalability, improved security and user experience.'
    },
    {
      title: 'Software Engineer Intern',
      company: 'Infobip',
      companyLink: 'https://www.infobip.com/',
      period: 'Jul 2021 - Aug 2021',
      description: 'Completed an intensive 2-month on-site internship working with software development.'
    }
  ];

  get visibleExperiences() {
    return this.isCollapsed ? this.experiences.slice(0, 3) : this.experiences;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
