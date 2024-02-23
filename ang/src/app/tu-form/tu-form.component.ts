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
  public boxes: TestCheckBox [];

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

export class TuFormComponent implements OnInit {
  boxes: TestCheckBox[] = [];

  ngOnInit(): void {
    const list = new CheckBoxList();
    this.boxes = list.boxes;
    logger.debug(`Initialized content in TU Form: ${JSON.stringify(this.boxes)}.`)
  }

  onChange(box: TestCheckBox): void {
    console.log(`Checkbox onCall fired for ${box}.`);
    switch (box.versionName) {
      case 'Альфа' : 
        if (box.signedFor) { 
          this.boxes[0].signedFor = true;
          this.boxes[1].signedFor = true
        } else {
          this.boxes[0].signedFor = false;
        }
        console.log('Alpha fixed!');
        break;
      case 'Бета' :
        if (box.signedFor) {
          this.boxes[1].signedFor = true;
        } else {
          this.boxes[1].signedFor = false;
          if (this.boxes[0].signedFor) { this.boxes[0].signedFor = false; }
        }
        console.log('Beta fixed!');
        break;
      case 'Релиз' :
        if (!box.signedFor) {
          this.boxes[2].signedFor = true;
        }
        console.log('Release fixed!');
    }
  }
}