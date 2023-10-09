import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { EmailDto } from './dtos/email.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  async create(@Body() createUserDto: CreateUserDto): Promise<object> {
    console.log(createUserDto);
    await this.usersService.createUser(createUserDto);

    return {
      message: 'User created!',
      data: {},
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<object> {
    const user = await this.usersService.login(loginDto);

    return {
      message: 'User logged!',
      data: user,
    };
  }

  @Patch('/change-password/:userId')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('userId') userId: string,
  ): Promise<object> {
    await this.usersService.changePassword(changePasswordDto, Number(userId));

    return {
      message: 'Password changed!',
      data: {},
    };
  }

  @Post('/recovery-password')
  async recoveryPassword(@Body() emailDto: EmailDto): Promise<object> {
    await this.usersService.recoveryPassword(emailDto);

    return {
      message: 'Your new password has been sent with successfully!',
      data: {},
    };
  }
}
