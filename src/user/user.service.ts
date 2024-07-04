import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {compareSync, hashSync} from 'bcrypt'
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwt: JwtService
    ) { }

    async createUser(createUserDto: CreateUserDto){
        const userIsExist = await this.findUserByEmail(createUserDto.email);
        if(userIsExist){
            throw new HttpException('User email already exist', HttpStatus.FOUND)
        }

        const hash = hashSync(createUserDto.password, 16)
        const newUser = new User({...createUserDto, password: hash});
        if(!newUser){
            throw new BadRequestException()
        }

        const user= await this.userRepository.save(newUser)
        return user;
    }

    async login(createUserDto: CreateUserDto, response: Response){
        const user = await this.findUserByEmail(createUserDto.email);
        if(!user){
            throw new UnauthorizedException()
        }

        const verifyPassword = compareSync(createUserDto.password, user.password)
        if(!verifyPassword){
            throw new UnauthorizedException()
        }

        delete user.password
        const payload = {sub: user.id, email: user.email, roles: user.roles}
        const token = await this.jwt.signAsync(payload);
        response.cookie('jwt', token)
        return {
            message: `${user.email} you are successfully logged in.`
        }
    }

    async findAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find();
        return users
    }


    async logout(response: Response): Promise<{message: string}>{
        response.clearCookie('jwt')
        return {
            message: 'logged out successfully.'
        }
    }

    private async findUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email: email}});
        return user;
    }
        
}
