import { Category } from './category';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: Category;
  image?: string;

  constructor(
    name: string,
    description: string,
    price: number,
    category: Category,
    image: string
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
  }
}
