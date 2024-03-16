import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
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

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }
}

bootstrapApplication(App);