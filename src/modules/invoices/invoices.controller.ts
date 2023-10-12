import {
  Body,
  Controller,
  Get,
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
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiHeader({
  name: 'Authorization',
  description: 'User token!',
  example:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqb2FvLnAxQGhvdG1haWwuY29tIiwibmFtZSI6Ikpvw6NvIFBlZHJvIiwiaWF0IjoxNjk2ODcwMjA1LCJleHAiOjE2OTcwNDMwMDV9.uuDVL8lzgTr_DASHxfiOx5VW0upCEY2pwtuxxuJVIfw',
})
@ApiTags('Invoices')
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
        ...invoices,
      },
    };
  }
}
