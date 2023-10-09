import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import { verifyPassword, encryptPassword } from 'src/utils/bcrypt';
import { LoginDto } from './dtos/login.dto';
import { UserDto } from './dtos/user.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { EmailDto } from './dtos/email.dto';
import { sendNewPassword } from 'src/utils/send-email';
import { generateRandomPassword } from 'src/utils/random-password';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  private async checkIfEmailAlreadyInUse(email: string): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if (user) throw new BadRequestException('Email already in use!');
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    await this.checkIfEmailAlreadyInUse(createUserDto.email);

    await this.repository.save({
      ...createUserDto,
      password: encryptPassword(createUserDto.password),
    });
  }

  async login(loginDto: LoginDto): Promise<UserDto> {
    const user = await this.repository.findByEmail(loginDto.email);

    if (!user) throw new NotFoundException('User not found!');

    if (!verifyPassword(loginDto.password, user.password))
      throw new BadRequestException('Incorrect password!');

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: number,
  ): Promise<void> {
    const user = await this.repository.findById(userId);

    if (!user) throw new NotFoundException('User not found!');

    if (!verifyPassword(changePasswordDto.oldPassword, user.password))
      throw new BadRequestException('Wrong old password!');

    await this.repository.update(userId, {
      password: encryptPassword(changePasswordDto.newPassword),
    });
  }

  async recoveryPassword(emailDto: EmailDto): Promise<void> {
    const user = await this.repository.findByEmail(emailDto.email);

    if (!user)
      throw new NotFoundException('Not exists an user with this email!');

    const newPassword = generateRandomPassword(8);

    await this.repository.update(user.id, {
      password: encryptPassword(newPassword),
    });

    await sendNewPassword(
      {
        email: user.email,
        password: newPassword,
      },
      {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    );
  }
}
