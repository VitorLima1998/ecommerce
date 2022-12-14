import { FavoritesComponent } from './core/components/favorites/favorites.component';
import { ProductsComponent } from './core/components/products/products.component';
import { CategoriesComponent } from './core/components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './core/components/cart/cart.component';
import { ShopComponent } from './core/components/shop/shop.component';
import { UsersComponent } from './core/components/users/users.component';

const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent,
    loadChildren: () =>
      import('./core/components/components.module').then(
        (shop) => shop.ComponentsModule
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

  {
    path: 'favorites',
    component: FavoritesComponent,
    loadChildren: () =>
      import('./core/components/components.module').then(
        (favorites) => favorites.ComponentsModule
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
    path: 'users',
    component: UsersComponent,
    loadChildren: () =>
      import('./core/components/components.module').then(
        (user) => user.ComponentsModule
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
