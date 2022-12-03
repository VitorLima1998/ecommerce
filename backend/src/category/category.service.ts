import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryRepository.save(createCategoryDto);
    return createCategoryDto;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = this.categoryRepository
      .createQueryBuilder('category')
      .select(['category.name'])
      .getOne();
    return category;
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    this.categoryRepository.save(updateCategoryDto);
  }

  async remove(categoryId: string) {
    const result = await this.categoryRepository.delete({ id: categoryId });
    if (result.affected === 0) {
      throw new NotFoundException('No category was found with the given ID');
    }
  }
}
