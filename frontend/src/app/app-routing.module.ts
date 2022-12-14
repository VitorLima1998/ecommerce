import { CategoryInsertDialogComponent } from './core/components/category-insert-dialog/category-insert-dialog.component';
import { ProductsComponent } from './core/components/products/products.component';
import { CategoriesComponent } from './core/components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './core/components/cart/cart.component';
import { FileUploadComponent } from './core/components/file-upload/file-upload.component';
import { ShopComponent } from './core/components/shop/shop.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'file', component: FileUploadComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shop', component: ShopComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
