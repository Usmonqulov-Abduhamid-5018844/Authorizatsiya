import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthorizatsiyaService } from './authorizatsiya.service';
import { CreateAuthorizatsiyaDto } from './dto/create-authorizatsiya.dto';
import { adminDto, UpdateAuthorizatsiyaDto } from './dto/update-authorizatsiya.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/rost.guard';
import { Roles } from 'src/decorator/Role.decorator';
import { Role } from './schema/authorizatsiya.schema';

@Controller('authorizatsiya')
export class AuthorizatsiyaController {
  constructor(private readonly authorizatsiyaService: AuthorizatsiyaService) {}

  @Post("register")
  register(@Body() data: CreateAuthorizatsiyaDto) {
    return this.authorizatsiyaService.register(data);
  }
  @Post("login")
  login(@Body() data: UpdateAuthorizatsiyaDto) {
    return this.authorizatsiyaService.login(data);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch("Add_admin/:id")
  admin(@Param("id") id: string, @Body() data: adminDto){
    return this.authorizatsiyaService.Add_admin(id, data)
  }

}
