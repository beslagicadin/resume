import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);

  initialize(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Inject Vercel Analytics script
      const script = document.createElement('script');
      script.defer = true;
      script.src = '/_vercel/insights/script.js';
      document.head.appendChild(script);
      
      console.log('Vercel Analytics initialized');
    }
  }
}
