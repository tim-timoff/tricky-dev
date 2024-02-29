import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, AsyncValidator, FormBuilder } from '@angular/forms';
import logger from './../../../../src/logger';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
// import { ErrorStateMatcher } from '@angular/material/core';

interface TestCheckBox {
  id: number,
  versionName: string,
  versionHelpTxt: string,
  signedFor: boolean,
}

class TCheckBox implements TestCheckBox {
  public id: number;
  public versionName: string;
  public versionHelpTxt: string;
  public signedFor: boolean;

  constructor(id: number, verRu: string, txt: string, signed: boolean) {
    this.id = id;
    this.versionName = verRu;
    this.versionHelpTxt = txt;
    this.signedFor = signed;
  }
}
const alpha = new TCheckBox(0, 'Альфа', 'Зовите меня, как только будет, что тестировать! (по приглашениям!)', false);
const beta = new TCheckBox(1, 'Бета', 'Зовите меня, когда большая часть функционала уже будет работать (публичный тест)', false);
const release = new TCheckBox(2, 'Релиз', 'Зовите меня, когда всё будет готово!', true);

@Component({
  selector: 'app-tu-form',
  standalone: true,
  templateUrl: './tu-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    CommonModule, 
    ButtonModule,
    InputTextModule, 
    PanelModule
  ],
  styleUrls: ['./tu-form.component.css'],
})

export class TuFormComponent implements OnInit {
  boxes = [alpha, beta, release];
  isValid = false;

  form = new FormGroup({
    versionSelect: new FormGroup({
      a: new FormControl(this.boxes[0]),
      b: new FormControl(this.boxes[1]),
      r: new FormControl(this.boxes[2])
    }),
    emailGroup: new FormGroup({
      email: new FormControl(''),
      submitBtn: new FormControl()
    })
  })

  ngOnInit(): void {
    logger.debug(`Initialized content in TU Form: ${JSON.stringify(this.form.value)}.`);
  }

  onSubmit() {
    console.log(`Signup form submitted with: ${this.form.value}`)
    logger.debug(`Signup form submitted with: ${this.form.value}`);
  }

  onEmailInput(event: any) {
    console.log(`Accessing content differently: ${event.target.value}`);
    logger.debug(`Accessing content differently: ${event.target.value}`);
  }

  checkBoxClicked(event: any): void {
    console.log(`${event.target} just got clicked.`);
    logger.debug(`${event.target} just got clicked.`);
  }

  trackBy(item: any): number {
    return item;
  }
}