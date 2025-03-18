import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private Jwt:JwtService){}
  canActivate(context: ExecutionContext) {
    let request: Request = context.switchToHttp().getRequest()
    let Token = request.headers.authorization?.split(" ")[1]
    try{
      if(!Token){
        throw new BadRequestException("Token topilmadi")
      }
      let data = this.Jwt.verify(Token)
      request["user"] = data
      return true
    }
    catch(error){
        throw new BadRequestException("Invalid Token")
    }
  }
}
