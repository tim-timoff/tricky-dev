import { Component } from '@angular/core';
import { TuFormComponent } from '../tu-form/tu-form.component';
import { ChipComponent } from '../../app/components/chip-control/chip.component'
import { ChipControlComponent } from '../components/chip-control/chip-control.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ TuFormComponent, ChipComponent, ChipControlComponent, ReactiveFormsModule  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      chips: new FormControl(new Map())
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
