import { Component } from '@angular/core';
import { TuFormComponent } from '../tu-form/tu-form.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ TuFormComponent ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {

}
