import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { AppFormsModule } from './app-forms/app-forms.module';

import { AppComponent } from './app.component';
import { TestUserFormComponent } from './app-forms/test-user.form.component';

@NgModule({
  declarations: [AppComponent, TestUserFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    AppFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}