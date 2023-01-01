import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { SpeedDialModule } from 'primeng/speeddial';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { InputMaskModule } from 'primeng/inputmask';

const MODULES = [
  CommonModule,
  AccordionModule,
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  PanelModule,
  DialogModule,
  DynamicDialogModule,
  ToastModule,
  TableModule,
  InputTextModule,
  DropdownModule,
  FileUploadModule,
  HttpClientModule,
  InputNumberModule,
  SpeedDialModule,
  SidebarModule,
  MenuModule,
  InputMaskModule,
];

@NgModule({
  declarations: [],
  imports: [MODULES, CommonModule],
  exports: [MODULES],
})
export class PrimeModule {}
