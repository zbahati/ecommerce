import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserGuard } from 'src/user/user.guard';
import { CurrentUser } from 'src/user/user.decorator';
import { RoleGuard } from 'src/user/role/role.guard';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(UserGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser() currentUser: number) {
    return this.categoryService.create(createCategoryDto, currentUser);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll(@CurrentUser() user: number) {
    return this.categoryService.findAll(user);
  }
  
  @UseGuards(RoleGuard)
  @Get('all')
  findAllByAdmin(){
    return this.categoryService.findAllCategoryByAdmin();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: number) {
    return this.categoryService.findOne(+id, user);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @CurrentUser() user: number) {
    return this.categoryService.update(+id, updateCategoryDto, user);
  }


  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: number) {
    return this.categoryService.remove(+id, user);
  }
}
