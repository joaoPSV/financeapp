import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    format: 'email',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Fulano de tal',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Jpz1235!',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  readonly password: string;
}
