import { InvoiceType } from '../enums/invoiceType.enum';

export class CreateInvoiceDto {
  description: string;

  value: number;

  type: InvoiceType;

  actionDate: Date;

  userId: number;
}
