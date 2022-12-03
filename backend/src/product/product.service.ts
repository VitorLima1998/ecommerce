import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.productRepository.save(createProductDto);
    return createProductDto;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository
      .createQueryBuilder('product')
      .select(['product.name'])
      .getOne();
    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    return this.productRepository.save(updateProductDto);
  }

  async remove(productId: string) {
    const result = await this.productRepository.delete({ id: productId });
    if (result.affected === 0) {
      throw new NotFoundException('No product was found with the given ID');
    }
  }
}
