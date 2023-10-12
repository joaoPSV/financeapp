import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';

import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateCategoriesDto } from './dtos/create-categories.dto';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';

@ApiHeader({
  name: 'Authorization',
  description: 'User token!',
  example:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqb2FvLnAxQGhvdG1haWwuY29tIiwibmFtZSI6Ikpvw6NvIFBlZHJvIiwiaWF0IjoxNjk2ODcwMjA1LCJleHAiOjE2OTcwNDMwMDV9.uuDVL8lzgTr_DASHxfiOx5VW0upCEY2pwtuxxuJVIfw',
})
@UseInterceptors(new AuthInterceptor())
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('')
  async create(@Body() createCategory: CreateCategoriesDto): Promise<object> {
    const category = await this.categoriesService.create(createCategory);

    return {
      message: 'Category created!',
      data: { ...category },
    };
  }

  @Get('')
  async list(): Promise<object> {
    const categories = await this.categoriesService.list();

    return {
      message: 'Categories list!',
      data: {
        categories,
      },
    };
  }
}
