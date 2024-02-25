import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms';
import logger from './../../../../src/logger';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridList } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';

export interface TestCheckBox {
  ver: string,
  versionName: string,
  versionHelpTxt: string,
  signedFor: boolean,
}

class TCheckBox implements TestCheckBox {
  ver: string;
  versionName: string;
  versionHelpTxt: string;
  signedFor: boolean;

  constructor(verEng: string, verRu: string, txt: string, signed: boolean) {
    this.ver = verEng;
    this.versionName = verRu;
    this.versionHelpTxt = txt;
    this.signedFor = signed;
  }
}

export class CheckBoxList {
  public boxes: TestCheckBox[];
  private alpha = new TCheckBox('alpha', 'Альфа', 'Зовите меня, как только будет, что тестировать! (по приглашениям!)', false);
  private beta = new TCheckBox('beta', 'Бета', 'Зовите меня, когда больгая часть функционала уже будет работать (публичный тест)', false);
  private releease = new TCheckBox('release', 'Релиз', 'Зовите меня, когда всё будет готово!', true);

  constructor() {
    this.boxes = [this.alpha, this.beta, this.releease];
    logger.debug('Boxes has been initialized.');
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styleUrls: ['./tu-form.component.css'],
})

export class TuFormComponent implements OnInit, AfterViewInit {
  boxes: TCheckBox[] = [];
  formModel: FormGroup;
  matcher: MyErrorStateMatcher;

  constructor() {
    this.boxes = new CheckBoxList().boxes;
    this.matcher = new MyErrorStateMatcher();
    this.formModel = new FormGroup({
      versionSelect: new FormGroup({
        alpha: new FormControl(this.boxes[0].ver),
        beta: new FormControl(this.boxes[1].ver),
        release: new FormControl(this.boxes[2].ver)
      }),
      emailGroup: new FormGroup({
        email: new FormControl(),
        submitBtn: new FormControl(),
      })
    });
  }

  onSubmit() {
    logger.debug(`Signup form submitted with: ${this.formModel.value}`);
  }

  ngOnInit(): void {
    this.boxes = new CheckBoxList().boxes;
    logger.debug(`Initialized content in TU Form: ${JSON.stringify(this.boxes)}.`)
  }

  ngAfterViewInit(): void {
    this.boxes[0].signedFor = this.boxes[1].signedFor = false;
    this.boxes[2].signedFor = true;
    logger.debug(`Component view has been initialized.`);
  }
}