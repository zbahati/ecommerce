import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserGuard } from 'src/user/user.guard';
import { CurrentUser } from 'src/user/user.decorator';

@UseGuards(UserGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: any) {
    return this.productService.create(createProductDto, user);
  }
  
  @Get()
  findAll(@CurrentUser() user: number) {
    return this.productService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string, @CurrentUser() user: number) {
    return this.productService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,  @CurrentUser() user: number) {
    return this.productService.update(+id, updateProductDto,user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string, @CurrentUser() user: number) {
    return this.productService.remove(+id, user);
  }
}
