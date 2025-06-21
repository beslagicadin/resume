import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

export const serverConfig: ApplicationConfig = {
  providers: [
    ...appConfig.providers,
    provideClientHydration(),
    provideServerRendering()
  ]
};

export const appManifest = {
  bootstrapApplication: serverConfig,
  rootElement: 'app-root'
};
