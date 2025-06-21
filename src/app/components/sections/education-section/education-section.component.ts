import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss']
})
export class EducationSectionComponent {
  educations: Education[] = [
    {
      degree: "Master's degree, Informatics and Data Technologies",
      institution: "Faculty of Electrical Engineering and Computer Science, University of Maribor",
      period: "Oct 2024 - Jun 2026",
      description: "Pursuing advanced studies in data technologies and informatics."
    },
    {
      degree: "Bachelor's degree, Informatics and Computer Science",
      institution: "Internacionalna poslovno-informaciona akademija Tuzla",
      period: "Oct 2018 - May 2023",
      description: "Completed undergraduate studies in computer science and informatics."
    },
    {
      degree: "Technician, Informatics and Computer Science",
      institution: "JUMS Elektrotehnička Škola Tuzla",
      period: "Sep 2014 - Jun 2018",
      description: "Completed technical high school education focused on computer science."
    }
  ];
}
