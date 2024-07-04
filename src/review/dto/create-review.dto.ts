import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateReviewDto {
    @IsNotEmpty()
    @IsNumber()
    ratings: number

    comments: string

    @IsNumber()
    @IsNotEmpty()
    productId: number

}
