import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    format: 'email',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'Jpz1235!',
  })
  readonly password: string;
}
