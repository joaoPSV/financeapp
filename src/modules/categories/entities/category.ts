import { Invoice } from 'src/modules/invoices/entities/invoice';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => Invoice, (invoice) => invoice.category)
  invoices: Invoice[];
}
