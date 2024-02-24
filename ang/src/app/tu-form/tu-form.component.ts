import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import logger from './../../../../src/logger';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridList } from '@angular/material/grid-list';

export interface TestCheckBox {
  versionName: string,
  versionHelpTxt: string,
  signedFor: boolean,
}

class TCheckBox implements TestCheckBox {
  versionName: string;
  versionHelpTxt: string;
  signedFor: boolean;

  constructor(ver: string, txt: string, signed: boolean) {
    this.versionName = ver;
    this.versionHelpTxt = txt;
    this.signedFor = signed;
  }
}

export class CheckBoxList {
  public boxes: TestCheckBox[];
  private alpha = new TCheckBox('Альфа', 'Зовите меня, как только будет, что тестировать! (по приглашениям!)', false);
  private beta = new TCheckBox('Бета', 'Зовите меня, когда больгая часть функционала уже будет работать (публичный тест)', false);
  private releease = new TCheckBox('Релиз', 'Зовите меня, когда всё будет готово!', true);

  constructor() {
    this.boxes = [this.alpha, this.beta, this.releease];
    logger.debug('Boxes has been initialized.');
  }
}

@Component({
  selector: 'app-tu-form',
  standalone: true,
  templateUrl: './tu-form.component.html',
  imports: [
    MatButtonModule,
    MatCheckbox,
    MatGridList,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule
    ],
  styleUrls: ['./tu-form.component.css'],
})

export class TuFormComponent implements OnInit, AfterViewInit {
  boxes: TCheckBox[] = [];
  signup = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.boxes = new CheckBoxList().boxes;
    logger.debug(`Initialized content in TU Form: ${JSON.stringify(this.boxes)}.`)
  }

  ngAfterViewInit(): void {
    this.boxes[0].signedFor = this.boxes[1].signedFor = false;
    this.boxes[2].signedFor = true;
    logger.debug(`Component view has been initialized.`);
  }

  onSubmit(formValue: any) {
    logger.debug(`Signup form submitted with: ${formValue}`);
  }
}