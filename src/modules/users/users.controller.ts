import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { EmailDto } from './dtos/email.dto';
import { sign } from 'jsonwebtoken';
import {
  AuthInterceptor,
  CustomRequest,
} from 'src/interceptors/auth.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
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
      data: {
        user,
        token: sign(user, process.env.SECRET_KEY, {
          expiresIn: '2 days',
        }),
      },
    };
  }

  @UseInterceptors(AuthInterceptor)
  @Patch('/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() request: CustomRequest,
  ): Promise<object> {
    await this.usersService.changePassword(
      changePasswordDto,
      Number(request.user.id),
    );

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
