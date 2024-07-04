import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { UserGuard } from './user.guard';
import { RoleGuard } from './role/role.guard';
import { User } from 'src/entity/user.entity';
import { PassThrough } from 'stream';
import { CurrentUser } from './user.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UserService){}
   
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }
    
    @Post('login')
    async login(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) response: Response){
        return this.userService.login(createUserDto, response)
    }

    @UseGuards(UserGuard)
    @Get('profile')
    async getProfile(@CurrentUser() user: number){
        const userDetails = await this.userRepository.findOne({
            relations: {
                category: true,
                product: true
            },
            where: {
                id: user
            }
        })
        return userDetails
    }


    @UseGuards(RoleGuard)
    @Get()
    async getAllUsers(): Promise<User[]>{
       return this.userService.findAllUsers();
    }

    @UseGuards(UserGuard)
    @Post('logout')
    async logOut(@Res({passthrough: true}) response: Response): Promise<{message: string}>{
        return this.userService.logout(response)
    }

}
