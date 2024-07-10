import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateShippingDto{
    @IsOptional()
    name: string

    @IsNotEmpty()
    @IsString()
    phone: string
    
    @IsNotEmpty()
    @IsString()
    country: string
    
    @IsNotEmpty()
    @IsString()
    city: string
 
    @IsNotEmpty()
    @IsString()
    state: string
}