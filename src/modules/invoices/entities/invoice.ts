import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceType } from '../enums/invoiceType.enum';
import { User } from 'src/modules/users/entities/user';
import { Category } from 'src/modules/categories/entities/category';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'float',
  })
  value: number;

  @Column({
    type: 'enum',
    enum: InvoiceType,
  })
  type: InvoiceType;

  @Column()
  actionDate: Date;

  @ManyToOne(() => User, (user) => user.invoices)
  user: User;

  @ManyToOne(() => Category, (category) => category.invoices)
  category: Category;
}
