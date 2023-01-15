import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './core/components/components.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './prime/prime.module';
import { ToolbarComponent } from './core/layout/toolbar/toolbar.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
// import { MaterialModule } from './material/material.module';

const MODULES = [
  PrimeModule,
  AppRoutingModule,
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  ComponentsModule,
  HttpClientModule,
  NgxCaptchaModule,
  RecaptchaModule,
  RecaptchaFormsModule,
  // MaterialModule,
];

@NgModule({
  imports: [MODULES],
  declarations: [AppComponent, ToolbarComponent],
  bootstrap: [AppComponent],
  // providers: [
  //   {
  //     provide: RECAPTCHA_SETTINGS,
  //     useValue: {
  //       siteKey: environment.recaptcha.siteKey,
  //     } as RecaptchaSettings,
  //   },
  // ],
})
export class AppModule {}
