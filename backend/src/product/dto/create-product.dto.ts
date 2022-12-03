import { Category } from './../../category/entities/category.entity';
export class CreateProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}
