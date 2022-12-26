import { Component } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  products!: Product[];
  fav: any;

  constructor(private productService: ProductService) {}

  //Inicializa a lista de categories
  ngOnInit() {
    this.fav = localStorage.getItem('prod');
    this.products = JSON.parse(this.fav);
  }

  removeProduct(product: Product) {
    console.log(product);
    let p = JSON.parse(localStorage.getItem('prod') as any);
    this.products = p.filter((p: Product) => {
      return p.id !== product.id;
    });

    localStorage.setItem('prod', JSON.stringify(this.products));
  }
}
