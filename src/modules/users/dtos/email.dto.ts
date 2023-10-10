import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    format: 'email',
  })
  @IsEmail()
  email: string;
}
