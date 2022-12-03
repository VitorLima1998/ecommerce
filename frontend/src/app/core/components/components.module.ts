import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { PrimeModule } from 'src/app/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductInsertDialogComponent } from './product-insert-dialog/product-insert-dialog.component';
import { CategoryInsertDialogComponent } from './category-insert-dialog/category-insert-dialog.component';
import { CartComponent } from './cart/cart.component';

const COMPONENTS = [
  CategoriesComponent,
  ProductsComponent,
  ProductInsertDialogComponent,
  CategoryInsertDialogComponent,
  CartComponent,
];
const MODULES = [
  CommonModule,
  MaterialModule,
  PrimeModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];
@NgModule({
  imports: [MODULES],
  exports: [COMPONENTS],
  declarations: [COMPONENTS],
})
export class ComponentsModule {}
