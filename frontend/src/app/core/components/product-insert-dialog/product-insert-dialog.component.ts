import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-insert-dialog',
  templateUrl: './product-insert-dialog.component.html',
  styleUrls: ['./product-insert-dialog.component.css'],
})
export class ProductInsertDialogComponent {
  formProducts = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    // this.product = new Product(); -> para não inicializar undefined
  }

  uploadedFiles: any[] = [];
  categories!: Category[];
  product!: Product;
  selectedProduct!: Product;

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  removeProduct(id: string) {
    this.productService.removeProduct(id);
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  onSubmit() {
    // this.product = new Product(
    //   this.name,
    //   this.description,
    //   this.price,
    //   this.category,
    //   this.image
    // );
    console.log('teste..');
    this.ref.close(this.product);
  }
}
