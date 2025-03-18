import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizatsiyaModule } from './authorizatsiya/authorizatsiya.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://usmonqulovabduhamid_2000:50803006730015@abduhamid.2nenh.mongodb.net/Authorizatsiya?retryWrites=true&w=majority&appName=Abduhamid',
    ),
    AuthorizatsiyaModule,
    AuthorModule,
    BookModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
