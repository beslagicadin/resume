import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Services
import { ThemeService } from './services/theme.service';

// Components
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ThemeToggleComponent,
    SidebarComponent,
    MainContentComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize application
    // console.log('CV application initialized');
    injectSpeedInsights();
  }
}
