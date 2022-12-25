import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

const MODULES = [MatInputModule];

@NgModule({
  declarations: [],
  imports: [MODULES, CommonModule],
  exports: [MODULES],
})
export class MaterialModule {}
