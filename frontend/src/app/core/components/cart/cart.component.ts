import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService],
})
export class CartComponent {
  products!: Product[];
  cart: any;
  subtotal!: number;
  shipping!: number;
  total!: number;

  constructor(private productService: ProductService) {}

  //Inicializa a lista de categories
  ngOnInit() {
    this.cart = localStorage.getItem('prod');
    this.products = JSON.parse(this.cart);
    this.subtotal = 0;
    this.shipping = 0;
    this.total = 0;
    this.update();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  removeProduct(product: Product) {
    console.log(product);
    let p = JSON.parse(localStorage.getItem('prod') as any);
    this.products = p.filter((p: Product) => {
      return p.id !== product.id;
    });

    localStorage.setItem('prod', JSON.stringify(this.products));
  }

  update() {
    let sum = 0;
    this.products.forEach((p) => {
      sum += p.quantity! * p.price!;
    });
    this.subtotal = sum;
    this.shipping = 10;
  }
}
