import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    price?: number;
    stock?: number;
    categoryId?: number;
    images?: string[];
    name?: string;
}
