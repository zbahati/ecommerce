import { Type } from "class-transformer";
import { CreateOrderProductDto } from "./order-product.dto";
import { ValidateNested } from "class-validator";
import { CreateShippingDto } from "./create-shipping.dto";

export class CreateOrderDto {
    @Type(()=> CreateShippingDto)
    @ValidateNested()
    shippingAddress: CreateShippingDto

    @Type(()=> CreateOrderProductDto)
    @ValidateNested()
    order_product: CreateOrderProductDto[]
}
