import * as bcrypt from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true, type: 'varchar', default: '' })
  name: string;
  @Column({ nullable: true, type: 'varchar', default: '' })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'varchar' })
  telephone: number;
  @Column({ type: 'varchar' })
  cpf: number;
  @Column()
  address: string;
  @Column()
  token: string;
  @Column({ nullable: true, type: 'varchar', default: '' })
  salt: string;
  @Column()
  image: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
