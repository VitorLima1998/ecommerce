//-----------------------------------------MODULES----------------------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { PrimeModule } from 'src/app/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//---------------------------------------COMPONENTS---------------------------------------------
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { CategoryInsertDialogComponent } from './category-insert-dialog/category-insert-dialog.component';
import { ProductInsertDialogComponent } from './product-insert-dialog/product-insert-dialog.component';
import { UserInsertDialogComponent } from './user-insert-dialog/user-insert-dialog.component';
import { CartComponent } from './cart/cart.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ShopComponent } from './shop/shop.component';

const COMPONENTS = [
  CategoriesComponent,
  ProductsComponent,
  UsersComponent,
  CategoryInsertDialogComponent,
  ProductInsertDialogComponent,
  UserInsertDialogComponent,
  CartComponent,
  FavoritesComponent,
  ShopComponent,
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
