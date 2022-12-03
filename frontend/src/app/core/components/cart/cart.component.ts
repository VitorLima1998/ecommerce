import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService],
})
export class CartComponent {
  categories!: Category[];

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  //Inicializa a lista de categories
  ngOnInit() {
    console.log(this.categoryService.getCategories());
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.getCategories();
  }
}
