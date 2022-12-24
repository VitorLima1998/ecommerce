import { CategoryInsertDialogComponent } from './core/components/category-insert-dialog/category-insert-dialog.component';
import { ProductsComponent } from './core/components/products/products.component';
import { CategoriesComponent } from './core/components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './core/components/cart/cart.component';
import { ShopComponent } from './core/components/shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'shop',
    component: ShopComponent,
    loadChildren: () =>
      import('./core/components/components.module').then(
        (shop) => shop.ComponentsModule
      ),
  },

  {
    path: 'categories',
    component: CategoriesComponent,
    loadChildren: () =>
      import('./core/components/components.module').then(
        (category) => category.ComponentsModule
      ),
  },

  {
    path: 'products',
    component: ProductsComponent,
    loadChildren: () =>
      import('./core/components/components.module').then(
        (product) => product.ComponentsModule
      ),
  },

  {
    path: 'cart',
    component: CartComponent,
    loadChildren: () =>
      import('./core/components/components.module').then(
        (cart) => cart.ComponentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
