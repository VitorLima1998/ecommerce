import { Category } from './../../category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('tbl_product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
  @Column()
  image: string;
}
