import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Project} from '../../../models/project.model';
import {ProjectCardComponent} from '../../project-card/project-card.component';
import {projects} from '../../../data/projects.data';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent {

  protected readonly projects = projects;
}
