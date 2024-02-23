import { Component } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ LandingComponent, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Tricky Blog';
}