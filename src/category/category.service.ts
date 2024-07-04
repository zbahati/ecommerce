import { HttpException, HttpStatus, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserGuard } from 'src/user/user.guard';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
){}

  async create(createCategoryDto: CreateCategoryDto, user: any) {
    const checkCegory = await this.findCategoryTitleByUser(createCategoryDto.title, user)
    if(checkCegory){
      throw new HttpException('Category title already exist.', HttpStatus.FOUND)
    }

    const newCategory = new Category({...createCategoryDto, addedBy: user})
    const category = await this.categoryRepository.save(newCategory);
    return category;
  }

  async findAll(user: any) {
    const categories = await this.categoryRepository.find({
      relations: {
        product: true
      },
      where: {
        addedBy: {
          id: user
        }
      }
    });

    if(!categories){
      throw new HttpException("No categories created!, please create one", HttpStatus.ACCEPTED)
    }
    return categories
  }

  async findOne(id: number, user: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
        addedBy: {
          id: user
        }
      }
    });
    if(!category){
      throw new NotFoundException("Category not found");
    }

    return category;
  }

  @UseGuards(UserGuard)
  async update(id: number, updateCategoryDto: UpdateCategoryDto,user: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
        addedBy: {
          id: user
        }
      }
    });

    if(!category){
      throw new NotFoundException();
    }

    const updateCategory = await this.categoryRepository.update(id, updateCategoryDto);
    return updateCategory;
  }

  async remove(id: number, user: number) {
    await this.findOne(id,user);
    const deleteId = await this.categoryRepository.delete(id)
    return deleteId;
  }

  async findAllCategoryByAdmin(){
    return this.categoryRepository.find()
  }
  
  private async findCategoryTitleByUser(title: string, user: any){
    const category = await this.categoryRepository.findOne(
      {
        where:{
          title: title,
          addedBy: {
            id: user
          }
        }
      }
    );
    return category;
  }
}
