import { Injectable, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  
  darkMode = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        this.darkMode.set(true);
        this.document.body.classList.add('dark-theme');
      }
    }
  }

  toggleTheme(): void {
    const isDarkMode = this.darkMode();
    this.darkMode.set(!isDarkMode);
    
    if (isPlatformBrowser(this.platformId)) {
      if (!isDarkMode) {
        this.document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        this.document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
