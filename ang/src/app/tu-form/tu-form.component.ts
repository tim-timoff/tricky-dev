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
  form: FormGroup;
  fb = new FormBuilder();

  constructor() {
    this.form = new FormGroup({
      versionSelect: new FormGroup({}),
      emailGroup: new FormGroup({
        email: new FormControl(''),
        submitBtn: new FormControl('')
      })
    })

    const versionSelectGroup = this.form.get('versionSelect') as FormGroup;

    for (let box of this.boxes) {
      versionSelectGroup.addControl(String(box.id), new FormControl(box.signedFor));
    }
  }

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

  onCheckboxChange(checkboxName: string) {
    logger.debug(`${checkboxName} Checkbox Value:`, this.form.get(`versionSelect.${checkboxName}`)?.value);
    console.log(`Box ${checkboxName} has changed!`);
  }
}