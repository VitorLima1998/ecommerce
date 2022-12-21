import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { CategoryInsertDialogComponent } from '../category-insert-dialog/category-insert-dialog.component';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    MessageService,
  ],
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];

  //Inicializa a lista de categories
  ngOnInit() {
    this.getCategories();
  }

  constructor(
    public dialogService: DialogService,
    private categoryService: CategoryService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  //Open Dialog -> chama o Component CategoryInsertDialog
  show() {
    const ref = this.dialogService.open(CategoryInsertDialogComponent, {
      header: 'Add Category',
    });

    // ADD CATEGORY
    ref.onClose.subscribe({
      next: (cat: Category) => {
        this.categoryService.addCategory(cat).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              detail: 'Category added successfully!',
            });
            this.getCategories();
          },
        });
      },
    });
  }

  // REMOVE CATEGORY
  async removeCategory(id: string) {
    await this.categoryService.removeCategory(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          detail: 'Category removed successfully!',
        });
        this.getCategories();
      },
      error: () => {
        console.error();
      },
    });
  }

  // LIST CATEGORY
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error(error);
      },
    });

    // this.getCategories();
  }

  // UPDATE CATEGORY
  updateCategory(categ: Category) {}

  removeData() {
    this.categories.pop();
  }
}
