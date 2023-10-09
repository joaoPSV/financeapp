import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

export class UsersRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
    const result = await this.repository.save(createUserDto);

    return result;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.repository.update(
      {
        id,
      },
      updateUserDto,
    );
  }
}
