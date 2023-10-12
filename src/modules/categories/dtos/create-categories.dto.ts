import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriesDto {
  @ApiProperty({
    example: 'Lazer',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://m.media-amazon.com/images/I/71U7Zyq15bL._AC_SL1500_.jpg',
  })
  @IsString()
  icon: string;
}
