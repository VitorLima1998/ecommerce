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

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  //Inicializa a lista de categories
  ngOnInit() {
    console.log(this.productService.getProducts());
    this.getProducts();
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

    // this.getCategories();
  }
}
