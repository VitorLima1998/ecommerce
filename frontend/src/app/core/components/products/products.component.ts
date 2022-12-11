import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { ProductInsertDialogComponent } from '../product-insert-dialog/product-insert-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    MessageService,
  ],
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  // Inicializa a lista de products
  ngOnInit() {
    this.getProducts();
  }

  constructor(
    public dialogService: DialogService,
    private productService: ProductService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  // Open Dialog -> chama o Component ProductInsertDialog onde o usuário irá adicionar um dado
  show() {
    const ref = this.dialogService.open(ProductInsertDialogComponent, {
      header: 'Add Product',
    });

    ref.onClose.subscribe({
      next: (prod: Product) => {
        this.productService.addProduct(prod).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              detail: 'Product added successfully!',
            });
            this.getProducts();
          },
        });
      },
    });
  }

  // REMOVE PRODUCT
  async removeProduct(id: string) {
    await this.productService.removeProduct(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          detail: 'Product removed successfully!',
        });
        this.getProducts();
      },
      error: () => {
        console.error();
      },
    });
  }

  // LIST PRODUCT
  getProducts() {
    this.productService.getProducts().subscribe({
      next: (prod) => {
        this.products = prod;
      },
      error: () => {
        console.error();
      },
    });

    // this.getProducts();
  }

  // UPDATE PRODUCT
  updateProduct(prod: Product) {}
}
