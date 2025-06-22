import { ApplicationConfig, APP_INITIALIZER, inject, PLATFORM_ID, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { faMapMarkerAlt, faBuilding, faEnvelope, faLightbulb, faMoon, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { AnalyticsService } from './services/analytics.service';
import { provideServiceWorker } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';

function initializeFontAwesomeIcons() {
  return () => {
    const library = inject(FaIconLibrary);
    library.addIcons(
      faMapMarkerAlt,
      faBuilding,
      faEnvelope,
      faLightbulb,
      faMoon,
      faExternalLinkAlt,
      faGithub,
      faLinkedin
    );
  };
}

function initializeVercelAnalytics() {
  return () => {
    const analyticsService = inject(AnalyticsService);
    analyticsService.initialize();
  };
}

// Environment check for browser platform
const isBrowser = typeof window !== 'undefined';

// Service worker providers
const serviceWorkerProviders = isBrowser ? 
  [provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  })] : [];


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFontAwesomeIcons,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeVercelAnalytics,
      multi: true
    },
    // Add service worker only in browser environment
    ...serviceWorkerProviders
  ]
};
