import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <app-root></app-root>
  `,
})

export class App {
  name ='Tricky';
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));