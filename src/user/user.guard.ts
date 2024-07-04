import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSecret } from 'src/constants';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwt: JwtService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.findUserByToken(request)
    if(!user){
      throw new UnauthorizedException()
    }
    try{
      request['user'] = user;
    }catch{
    throw new UnauthorizedException()
    }

    return true;
  }

 async findUserByToken(request: Request){
    const token = await request.cookies['jwt']
    if(!token){
      throw new UnauthorizedException('Login is needed. to continue')
    }
    const user = await this.jwt.verifyAsync(token,{secret: jwtSecret.JWT_SECRET})
    return user;
  }
}
