import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/constants';
import { Roles } from 'src/entity/role.enum';
import { UserGuard } from '../user.guard';
@Injectable()

export class RoleGuard extends UserGuard implements CanActivate  {
  constructor(jwt: JwtService){
    super(jwt)
  }
async  canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    const request = context.switchToHttp().getRequest();
        
    const user = await this.findUserByToken(request)
    if(!user){
      throw new UnauthorizedException()
    }

    if(!user.roles.includes(Roles.ADMIN)){
      throw new UnauthorizedException()
    }

    try{
      request['user'] = user;
    }catch{
    throw new UnauthorizedException()
    }

    return true;
  }
  
}
