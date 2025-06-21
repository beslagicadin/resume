import { ApplicationConfig, APP_INITIALIZER, inject, PLATFORM_ID, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { faMapMarkerAlt, faBuilding, faEnvelope, faLightbulb, faMoon, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFontAwesomeIcons,
      multi: true
    }
  ]
};
