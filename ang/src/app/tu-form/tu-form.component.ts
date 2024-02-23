import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import logger from './../../../../src/logger';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface TestCheckBox {
  versionName: string,
  versionHelpTxt: string,
  signedFor: boolean,
}

export class CheckBoxList {
  boxes: TestCheckBox [];

  constructor() {
    this.boxes = [
      {
        versionName: 'Альфа',
        versionHelpTxt: 'Зовите меня, как только будет, что тестировать! (по приглашениям!)',
        signedFor: false
      },
      {
        versionName: 'Бета',
        versionHelpTxt: 'Зовите меня, когда больгая часть функционала уже будет работать (публичный тест)',
        signedFor: false
      },
      {
        versionName: 'Релиз',
        versionHelpTxt: 'Зовите меня, когда всё будет готово!',
        signedFor: true
      },
    ]
    logger.debug('Boxes has been initialized.');
  }

  setAlpha() {
    this.boxes[0].signedFor = true;
    this.boxes[1].signedFor = true;
  }

  setBeta() {
    this.boxes[1].signedFor = true;
  }
}

@Component({
  selector: 'app-tu-form',
  standalone: true,
  templateUrl: './tu-form.component.html',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  styleUrls: ['./tu-form.component.css'],
})

export class TuFormComponent {

}