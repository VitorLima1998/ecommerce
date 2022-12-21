import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [MessageService],
})
export class ShopComponent implements OnInit {
  products!: Product[];

  cart: Product[] = [];

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  // Inicializa a lista de products
  ngOnInit() {
    let p = JSON.parse(localStorage.getItem('prod') as any);
    console.log(p);

    if (p !== null) {
      this.cart = p;
    }

    this.productService.getProducts().subscribe({
      next: (prod) => {
        this.products = prod;
      },
      error: () => {
        console.error();
      },
    });
  }

  addProd(prod: Product) {
    prod.quantity = 1;
    this.cart.push(prod);

    this.messageService.add({
      severity: 'info',
      summary: 'Product added to cart',
      detail: '',
    });
    localStorage.setItem('prod', JSON.stringify(this.cart));
  }
}
