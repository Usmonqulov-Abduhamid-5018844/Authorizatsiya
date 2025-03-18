import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, Authorschema } from './schema/author.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Author.name, schema: Authorschema}])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
