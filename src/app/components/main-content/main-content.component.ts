import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSectionComponent } from '../sections/about-section/about-section.component';
import { ExperienceSectionComponent } from '../sections/experience-section/experience-section.component';
import { EducationSectionComponent } from '../sections/education-section/education-section.component';
import { ProjectsSectionComponent } from '../sections/projects-section/projects-section.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    AboutSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ProjectsSectionComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
}
