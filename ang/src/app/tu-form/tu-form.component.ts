import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import logger from './../../../../src/logger';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
// import { ErrorStateMatcher } from '@angular/material/core';

interface TestCheckBox {
  ver: string,
  versionName: string,
  versionHelpTxt: string,
  signedFor: boolean,
}

class TCheckBox implements TestCheckBox {
  public ver: string;
  public versionName: string;
  public versionHelpTxt: string;
  public signedFor: boolean;

  constructor(verEng: string, verRu: string, txt: string, signed: boolean) {
    this.ver = verEng;
    this.versionName = verRu;
    this.versionHelpTxt = txt;
    this.signedFor = signed;
  }
}
const alpha = new TCheckBox('alpha', 'Альфа', 'Зовите меня, как только будет, что тестировать! (по приглашениям!)', false);
const beta = new TCheckBox('beta', 'Бета', 'Зовите меня, когда большая часть функционала уже будет работать (публичный тест)', false);
const release = new TCheckBox('release', 'Релиз', 'Зовите меня, когда всё будет готово!', true);

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
  alpha = alpha;
  beta = beta;
  release = release;
  formModel: FormGroup;
  isValid = false;
  email = '';

  constructor(fb : FormBuilder) {
    this.formModel = fb.group({
      versionSelect: fb.group({
        'alpha': this.alpha, 
        'beta': this.beta,
        'release': this.release,
      }),
      emailGroup: fb.group({
        'email': '',
        'submitBtn': '',
      })
    });
  }

  onSubmit() {
    console.log(`Signup form submitted with: ${this.formModel.value}`)
    logger.debug(`Signup form submitted with: ${this.formModel.value}`);
  }

  ngOnInit(): void {
    logger.debug(`Initialized content in TU Form: ${JSON.stringify(this.formModel.value)}.`);
  }

  onEmailInput(event: any) {
    console.log(`Accessing content differently: ${event.target.value}`);
    logger.debug(`Accessing content differently: ${event.target.value}`);
  }

  checkBoxClicked(event: any): void {
    console.log(`${event.target} just got clicked.`);
    logger.debug(`${event.target} just got clicked.`);
  }
}