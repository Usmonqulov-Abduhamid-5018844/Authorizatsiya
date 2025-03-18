import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/authorizatsiya/schema/authorizatsiya.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserSchema: Model<User>) {}

  async findAll() {
    let user = await this.UserSchema.find();
    if (!user.length) {
      return { Message: 'NOt fount user' };
    }
    return user;
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
    {
      return {Message: "Mongodb id no'to'g'ri kritildi"}
    }
    let user = await this.UserSchema.findById(id);
    if (!user) {
      return { Message: 'Not Fount UserId' };
    }
    return user;
  }

  async update(id: string, newdata: UpdateUserDto) {
    if(!mongoose.Types.ObjectId.isValid(id))
      {
        return {Message: "Mongodb id no'to'g'ri kritildi"}
      }
    let user = await this.UserSchema.findById(id);
    if (!user) {
      return { Message: 'Not Fount UserId' };
    }
    let {password} = newdata;
    if(password){
      let hash = bcrypt.hashSync(password, 10);
      newdata.password = hash
    }
    return await this.UserSchema.findByIdAndUpdate(id, newdata, { new: true });
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      {
        return {Message: "Mongodb id no'to'g'ri kritildi"}
      }
    let user = await this.UserSchema.findById(id);
    if (!user) {
      return { Message: 'Not Fount UserId' };
    }
    return await this.UserSchema.findByIdAndDelete(id) 
  }
}
