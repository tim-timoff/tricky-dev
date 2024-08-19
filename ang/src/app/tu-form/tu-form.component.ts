import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestCheckBox } from './tu-form.model';
import { TrickyChipComponent } from '../components/chip-control/chip.component';
import { ChipControlComponent } from '../components/chip-control/chip-control.component';
import { TTagColor } from '../components/chip-control/chip.model';

class TCheckBox implements TestCheckBox {
  public versionKey: string;
  public versionName: string;
  public versionHelpTxt: string;
  public versionColour: TTagColor | string;
  public versionChecked: boolean;

  constructor(key: string, verRu: string, txt: string, colour: string, checked: boolean) {
    this.versionKey = key;
    this.versionName = verRu;
    this.versionHelpTxt = txt;
    this.versionColour = colour;
    this.versionChecked = checked;
  }
}
const alpha = new TCheckBox('Alfa', 'Альфа', 'Зовите меня, как только будет, что тестировать! (по приглашениям!)', 'green', false);
const beta = new TCheckBox('Beta', 'Бета', 'Зовите меня, когда большая часть функционала уже будет работать (публичный тест)', 'brown', false);
const release = new TCheckBox('Release', 'Релиз', 'Зовите меня, когда всё будет готово!', 'orange', true);

@Component({
  selector: 'app-tu-form',
  standalone: true,
  templateUrl: './tu-form.component.html',
  styleUrls: ['./tu-form.component.less'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TrickyChipComponent,
    ChipControlComponent
  ],
})

export class TuFormComponent implements OnInit {

  form!: FormGroup;
  boxes = [alpha, beta, release];

  ngOnInit(): void {
    this.form = new FormGroup({
      chips: new FormControl(new Map()),
      email: new FormControl('', [ Validators.required, Validators.email ]),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      console.error('Form is invalid')
      return;
    }
    console.log('Form Submitted:', this.form.value.chips)
  }
}