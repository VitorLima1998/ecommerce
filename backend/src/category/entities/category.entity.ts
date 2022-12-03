import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
}
