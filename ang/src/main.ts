import { platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LandingComponent } from './app/landing/landing.component';

platformBrowser().bootstrapModule(LandingComponent)
  .catch((err) => console.error(err));