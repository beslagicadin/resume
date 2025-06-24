import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from '../../services/theme.service';
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  faSun = faLightbulb;
  faMoon = faMoon;
  
  constructor(public themeService: ThemeService) {}
  
  get isDarkTheme(): boolean {
    return this.themeService.darkMode();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
