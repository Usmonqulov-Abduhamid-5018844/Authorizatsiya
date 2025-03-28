import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'src/authorizatsiya/schema/authorizatsiya.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
