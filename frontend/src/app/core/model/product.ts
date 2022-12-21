import { Category } from './category';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: Category;
  image?: string;
  quantity?: number;

  constructor(
    name: string,
    description: string,
    price: number,
    category: Category,
    image: string,
    quantity: number
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
    this.quantity = quantity;
  }
}
