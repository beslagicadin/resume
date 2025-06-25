import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Education {
  degree: string;
  institution: string;
  institutionLink: string;
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
      institutionLink: "https://feri.um.si/",
      period: "Oct 2024 - Jun 2026",
      description: "Pursuing advanced Master studies in data technologies and informatics."
    },
    {
      degree: "Bachelor's degree, Informatics and Computer Science",
      institution: "Internacionalna poslovno-informaciona akademija Tuzla",
      institutionLink: "https://ipi-akademija.ba/",
      period: "Oct 2018 - May 2023",
      description: "Completed undergraduate studies in informatics and computer science."
    },
    {
      degree: "Technician, Informatics and Computer Science",
      institution: "JUMS Elektrotehnička Škola Tuzla",
      institutionLink: "https://etstuzla.skolatk.edu.ba/",
      period: "Sep 2014 - Jun 2018",
      description: "Completed technical high school education focused on computer science."
    }
  ];
}
