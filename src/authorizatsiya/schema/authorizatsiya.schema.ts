
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
USER = "USER",
ADMIN = "ADMIN",
SUPPER_ADMIN = "SUPPER_ADMIN",

}
@Schema()
export class User extends Document{
  @Prop()
  name: string;

  @Prop()
  phone: number;
  @Prop({enum: Role, default: Role.USER})
  role: Role

  @Prop()
  email: string;

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User);
