import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-user-form',
  templateUrl: './test-user.form.component.html',
  styleUrls: ['../../../assets/css/tricky-dev.css', './test-user.form.component.css']
})

export class TestUserFormComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  switchPosition = 'release';

  get isFormValid(): boolean {
    return this.emailControl.valid;
  }

  onSwitchChange(position: string): void {
    this.switchPosition = position;
  }

  onSubmit(): void {
    // Handle form submission logic here
  }

  ngOnInit() {
    console.log('Test user form component initialized');
  }
}