import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, AsyncValidator, FormBuilder } from '@angular/forms';
import logger from './../../../../src/logger';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { EVersionName, TestCheckBox } from './tu-form.model';
// import { ErrorStateMatcher } from '@angular/material/core';

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
    PanelModule
  ],
})

export class TuFormComponent implements OnInit {
  ngOnInit(): void {
    for (let box of this.boxes) {
      if (box.signedFor) {
        // this.form.patchValue(release.checked)
      }
    }
  }
  boxes = [alpha, beta, release];
  selectedBox = Array<EVersionName>;
  form = new FormGroup({
    versionSelect: new FormGroup({
      'Alfa': new FormControl(this.boxes[0].signedFor),
      'Beta': new FormControl(this.boxes[1].signedFor),
      'Release': new FormControl(this.boxes[2].signedFor),
    }),
    email: new FormControl('', Validators.email),
  })
  // fb = new FormBuilder();

  // constructor() {
  //   const versionSelectGroup = this.form.get('versionSelect') as FormGroup;

  //   for (let box of this.boxes) {
  //     versionSelectGroup.addControl(String(box.id), new FormControl(box.signedFor));
  //   }
  // }

  onSubmit() {
    console.log(`Signup form submitted with: ${this.form.value}`)
    // logger.debug(`Signup form submitted with: ${this.form.value}`);
  }

  onEmailInput(event: any) {
    console.log(`Accessing content differently: ${event.target.value}`);
    // logger.debug(`Accessing content differently: ${event.target.value}`);
  }

  checkboxClicked(b: TCheckBox) {
    // logger.debug(`Checkbox ${b.versionName} clicked!`);
    console.log(`Checkbox ${b.versionName} clicked!`);
  }
}