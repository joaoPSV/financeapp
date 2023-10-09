import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import {
  AuthInterceptor,
  CustomRequest,
} from 'src/interceptors/auth.interceptor';

@UseInterceptors(new AuthInterceptor())
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('balance')
  async getBalance(@Req() request: CustomRequest): Promise<object> {
    const balance = await this.invoicesService.getBalance(request.user.id);
    return {
      message: 'Balance returned',
      data: {
        balance,
      },
    };
  }

  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<object> {
    await this.invoicesService.save(createInvoiceDto, request.user.id);
    return {
      message: 'Invoice created!',
      data: {},
    };
  }

  @Get()
  async findAll(
    @Query('month') month: number,
    @Query('year') year: number,
    @Req() request: CustomRequest,
  ): Promise<object> {
    const invoices = await this.invoicesService.findAll(
      Number(request.user.id),
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
