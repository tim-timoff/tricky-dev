import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { LandingComponent } from './app/landing/landing.component';

import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent],
  template: `
    <app-landing></app-landing>
  `,
})

export class App {
  name = 'Tricky';

  constructor() {}
}

bootstrapApplication(App);