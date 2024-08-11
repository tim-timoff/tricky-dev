import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, RequiredValidator } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TestCheckBox } from './tu-form.model';
import { ChipComponent } from '../components/chip-control/chip.component';
import { ChipControlComponent } from '../components/chip-control/chip-control.component';

class TCheckBox implements TestCheckBox {
  public id: number;
  public versionLetter: string;
  public versionName: string;
  public versionHelpTxt: string;
  public signedFor: boolean;

  constructor(id: number, letter: string, verRu: string, txt: string, signed: boolean) {
    this.id = id;
    this.versionLetter = letter;
    this.versionName = verRu;
    this.versionHelpTxt = txt;
    this.signedFor = signed;
  }
}
const alpha = new TCheckBox(0, 'a', 'Альфа', 'Зовите меня, как только будет, что тестировать! (по приглашениям!)', false);
const beta = new TCheckBox(1, 'b', 'Бета', 'Зовите меня, когда большая часть функционала уже будет работать (публичный тест)', false);
const release = new TCheckBox(2, 'r', 'Релиз', 'Зовите меня, когда всё будет готово!', true);

@Component({
  selector: 'app-tu-form',
  standalone: true,
  templateUrl: './tu-form.component.html',
  styleUrls: ['./tu-form.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    ChipComponent,
    ChipControlComponent
  ],
})

export class TuFormComponent implements OnInit {

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      chips: new FormControl(new Map()),
      email: new FormControl('', [ Validators.required, Validators.email ]),
    });
  }
  // boxes = [alpha, beta, release];

  onSubmit() {
    this.form.valid
      ? console.log('Form Submitted:', this.form.value)
      : console.error('Form is invalid')
  }
}