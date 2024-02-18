// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { AppFormsModule } from './app-forms/app-forms.module';

@NgModule({
  declarations: [AppComponent, CustomFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    AppFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}