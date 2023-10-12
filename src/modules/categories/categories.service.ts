import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoriesDto } from './dtos/create-categories.dto';
import { Category } from './entities/category';

@Injectable()
export class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

  async create(createCategoriesDto: CreateCategoriesDto): Promise<Category> {
    return this.repository.save(createCategoriesDto);
  }

  async list(): Promise<Category[]> {
    return this.repository.findAll();
  }
}
