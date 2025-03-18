import { Module } from '@nestjs/common';
import { AuthorizatsiyaService } from './authorizatsiya.service';
import { AuthorizatsiyaController } from './authorizatsiya.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/authorizatsiya.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'Abduhmid',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthorizatsiyaController],
  providers: [AuthorizatsiyaService],
})
export class AuthorizatsiyaModule {}
