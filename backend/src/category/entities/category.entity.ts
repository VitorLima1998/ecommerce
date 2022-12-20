import { Product } from './../../product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tbl_category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];
}
