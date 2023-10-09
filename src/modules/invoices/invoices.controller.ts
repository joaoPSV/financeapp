import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('balance/:userId')
  async getBalance(@Param('userId') userId: number): Promise<object> {
    const balance = await this.invoicesService.getBalance(userId);
    return {
      message: 'Balance returned',
      data: {
        balance,
      },
    };
  }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<object> {
    await this.invoicesService.save(createInvoiceDto);
    return {
      message: 'Invoice created!',
      data: {},
    };
  }

  @Get()
  async findAll(
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('userId') userId: number,
  ): Promise<object> {
    const invoices = await this.invoicesService.findAll(
      Number(userId),
      Number(month),
      Number(year),
    );
    return {
      message: 'Invoices returned',
      data: {
        invoices,
      },
    };
  }
}
