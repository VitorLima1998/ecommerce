import { CategoryInsertDialogComponent } from './core/components/category-insert-dialog/category-insert-dialog.component';
import { ProductsComponent } from './core/components/products/products.component';
import { CategoriesComponent } from './core/components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'catDialog', component: CategoryInsertDialogComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
