import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateOrderProductDto{

    @IsNotEmpty()
    @IsPositive()
    @IsNumber({maxDecimalPlaces: 2})
    product_unit_price: number

    @IsNotEmpty()
    @IsPositive()
    product_quantity: number

    @IsNotEmpty()
    id: number
}