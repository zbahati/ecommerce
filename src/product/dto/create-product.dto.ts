import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2})
    price: number

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number

    @IsNotEmpty()
    @IsArray()
    images: string[]

    @IsNotEmpty()
    @IsNumber()
    categoryId: number
}
