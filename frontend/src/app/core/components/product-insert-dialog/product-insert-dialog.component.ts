import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { CategoryService } from '../../services/category.service';
import { FileUploadService } from '../../services/file-upload.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-insert-dialog',
  templateUrl: './product-insert-dialog.component.html',
  styleUrls: ['./product-insert-dialog.component.css'],
})
export class ProductInsertDialogComponent {
  formProducts = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private uploadService: FileUploadService
  ) {
    // this.product = new Product(); -> para não inicializar undefined
    this.fileName = '';
  }

  fileName: string;
  uploadedFiles: any[] = [];
  categories!: Category[];
  product!: Product;
  selectedProduct!: Product;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
    this.fileInfos = this.uploadService.getFiles();
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
    if (this.fileName === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Faça Upload da Imagem',
      });
      return;
    }
    this.fileName = `http://localhost:3000/api/product/img/${this.fileName}`;

    this.product = new Product(
      this.formProducts.get('name')?.value as any,
      this.formProducts.get('description')?.value as any,
      this.formProducts.get('price')?.value as any,
      this.formProducts.get('category')?.value as any,
      this.fileName
    );
    this.ref.close(this.product);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          // next: (req) => {
          //   console.log(req);
          // },
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileName = event.body.filename;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
