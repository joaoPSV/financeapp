import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { InvoicesRepository } from './invoices.repository';
import { MonthlyData } from './dtos/monthly-data.dto';
import { Invoice } from './entities/invoice';

@Injectable()
export class InvoicesService {
  constructor(private repository: InvoicesRepository) {}

  async save(
    createInvoiceDto: CreateInvoiceDto,
    userId: number,
  ): Promise<void> {
    await this.repository.save(createInvoiceDto, userId);
  }

  private sumBalance(invoices: Invoice[]): number {
    return invoices.reduce((acc, curr) => {
      return curr.type === 'GAIN' ? acc + curr.value : acc - curr.value;
    }, 0);
  }

  async getBalance(userId: number): Promise<number> {
    const invoices = await this.repository.getInvoicesByUserId(userId);

    return this.sumBalance(invoices);
  }

  async findAll(
    userId: number,
    month: number,
    year: number,
  ): Promise<MonthlyData> {
    const initialDate = `${year}-${month}-01 00:00:00`;
    const endDate =
      month == 12
        ? `${year + 1}-01-01 00:00:00`
        : `${year}-${month + 1}-01 00:00:00`;

    const invoices = await this.repository.getInvoicesByUserIdAndDate(
      userId,
      new Date(initialDate),
      new Date(endDate),
    );

    return {
      invoices,
      balance: this.sumBalance(invoices),
    };
  }
}
