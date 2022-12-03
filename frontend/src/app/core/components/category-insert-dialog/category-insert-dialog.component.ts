import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-insert-dialog',
  templateUrl: './category-insert-dialog.component.html',
  styleUrls: ['./category-insert-dialog.component.css'],
})
export class CategoryInsertDialogComponent {
  name = new FormControl('');

  constructor(
    private categoryService: CategoryService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    // this.category = new Category(); -> para não inicializar undefined
  }
  category!: Category;

  removeCategory(id: string) {
    this.categoryService.removeCategory(id);
  }

  onSubmit() {
    this.category = new Category(this.name.value as string);
    this.ref.close(this.category);
  }
}
