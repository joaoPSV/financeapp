import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { InvoiceType } from '../enums/invoiceType.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({
    example: 'Conta de luz',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 137.5,
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    enum: InvoiceType,
  })
  @IsEnum(InvoiceType)
  type: InvoiceType;

  @ApiProperty({
    example: '2024-01-01',
  })
  @IsDate()
  actionDate: Date;
}
