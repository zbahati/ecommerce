import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductService: Repository<Product>,
    private readonly categoryService: CategoryService
  ){}
  async create(createProductDto: CreateProductDto, user: any) {
    const category = await this.categoryService.findOne(createProductDto.categoryId,user);
    const newProduct = new Product(createProductDto);
    newProduct.addedBy = user;
    newProduct.category = category
    const product = await this.ProductService.save(newProduct)
    return product;

  }

  async findAll(user:any) {
    const products = await this.ProductService.find({
      where: {
        addedBy: user
      }
    });
    if(!products){
      throw new HttpException("No products", HttpStatus.NOT_FOUND);
    }
    return products;
  }

  async findOne(id: number, user: number) {
    const product = await this.ProductService.findOne({
      relations: {
        category: true
      },
      where: {
        id: id
      }
    });
    if(!Product){
      throw new NotFoundException("Product not Found!");
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: number) {
    await this.findOne(id,user);
    await this.categoryService.findOne(updateProductDto.categoryId, user);

    const updateProduct = await this.ProductService.update(id,updateProductDto)
    if(!updateProduct){
      throw new BadRequestException();
    }

    return updateProduct;
  }

  async remove(id: number, user: number) {
    await this.findOne(id, user);
    const removeProductId = await this.ProductService.delete(id)
    return {
      message: `#ID ${id} was successfully Deleted.`
    }
  }
}
