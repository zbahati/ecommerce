import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/entity/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly ProductService: ProductService

  ){}
  async create(createReviewDto: CreateReviewDto, user: any) {
   const product = await this.ProductService.findOne(createReviewDto.productId, user);
   if(!product){
    throw new NotFoundException(`Product with ID#${createReviewDto.productId} is  not found`)
   }
   let review = await this.findOneByUserAndProduct(user, createReviewDto.productId);
   if(!review){
    review = this.reviewRepository.create()
    review.product = product,
    review.user = user
   }
   review.comments = createReviewDto.comments,
   review.ratings = createReviewDto.ratings
   const rev = await this.reviewRepository.save(review);
    return rev
  }


  findAll() {
    return this.reviewRepository.find({
      relations:{
        user: true,
        product: {
          category: true
        }
      }
    })
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: {
        id: id
      },
      relations:{
        user: true,
        product: {
          category: true
        }
      }
    });

    if(!review){
      throw new NotFoundException(`ID#${id} is not found`);
    }
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }

  async findOneByUserAndProduct(userId: any, productId: number){
    const review = await this.reviewRepository.findOne({
      where: {
        user:{
          id: userId
        },
        product: {
          id: productId
        }
      },
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    });
    return review;

  }
}
