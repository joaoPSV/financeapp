import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category';
import { Repository } from 'typeorm';
import { CreateCategoriesDto } from './dtos/create-categories.dto';

export class CategoriesRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async save(createCategoriesDto: CreateCategoriesDto): Promise<Category> {
    const result = await this.repository.save(createCategoriesDto);

    return result;
  }

  async findAll(): Promise<Category[]> {
    const user = await this.repository.find();
    return user;
  }
}
