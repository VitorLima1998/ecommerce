import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './core/components/components.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from './material/material.module';
import { PrimeModule } from './prime/prime.module';
import { ToolbarComponent } from './core/layout/toolbar/toolbar.component';

const MODULES = [
  PrimeModule,
  AppRoutingModule,
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  // MaterialModule,
  ComponentsModule,
  HttpClientModule,
];

@NgModule({
  imports: [MODULES, BrowserAnimationsModule],
  declarations: [AppComponent, ToolbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
