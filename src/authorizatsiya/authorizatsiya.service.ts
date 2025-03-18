import { Injectable, UseGuards } from '@nestjs/common';
import { CreateAuthorizatsiyaDto } from './dto/create-authorizatsiya.dto';
import {
  adminDto,
  UpdateAuthorizatsiyaDto,
} from './dto/update-authorizatsiya.dto';
import { Role, User } from './schema/authorizatsiya.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/rost.guard';
import { Roles } from 'src/decorator/Role.decorator';

@Injectable()
export class AuthorizatsiyaService {
  constructor(
    @InjectModel(User.name) private UserSchema: Model<User>,
    private Jwt: JwtService,
  ) {}

  async register(data: CreateAuthorizatsiyaDto) {
    let { email, password } = data;
    let user = await this.UserSchema.findOne({ email });
    if (user) {
      return { Message: "Siz ro'yahaddan o'tgansiz" };
    }
    let hash = bcrypt.hashSync(password, 10);
    data.password = hash;
    return this.UserSchema.create(data);
  }

  async login(data: UpdateAuthorizatsiyaDto) {
    let { email, password } = data;
    let user = await this.UserSchema.findOne({ email });
    if (!user) {
      return { Message: "Siz ro'yhaddan o'tmagansiz" };
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return { Message: 'Parol xato kritildi' };
    }
    return { Token: this.Jwt.sign({ id: user._id, role: user.role }) };
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(AuthGuard)
  async Add_admin(id: string, data: adminDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "MongoId noto'g'ri jo'natilgan" };
    }
    let user = await this.UserSchema.findById(id);
    if (!user) {
      return { Message: 'User Not found' };
    }
    return await this.UserSchema.findByIdAndUpdate(
      id,
      { role: data.role },
      { new: true },
    );
  }
}
