import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice';
import { Between, Repository } from 'typeorm';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';

export class InvoicesRepository {
  constructor(
    @InjectRepository(Invoice) private repository: Repository<Invoice>,
  ) {}

  async save(createInvoiceDto: CreateInvoiceDto, userId): Promise<Invoice> {
    const result = await this.repository.save({
      user: {
        id: userId,
      },
      ...createInvoiceDto,
    });

    return result;
  }

  async getInvoicesByUserId(userId: number): Promise<Invoice[]> {
    const result = await this.repository.find({
      where: {
        user: { id: userId },
      },
    });

    return result;
  }

  async getInvoicesByUserIdAndDate(
    userId: number,
    initialDate: Date,
    endDate: Date,
  ): Promise<Invoice[]> {
    const result = await this.repository.find({
      where: {
        actionDate: Between(initialDate, endDate),
        user: { id: userId },
      },
    });

    return result;
  }
}
