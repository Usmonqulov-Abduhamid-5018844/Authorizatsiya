import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schema/author.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private AuthorSchema: Model<Author>) {}

  async create(data: CreateAuthorDto) {
    let { name } = data;
    let author = await this.AuthorSchema.findOne({ name });
    if (author) {
      return { Message: 'Author name exists' };
    }
    return await this.AuthorSchema.create(data);
  }

  async findAll() {
    let author = await this.AuthorSchema.find();
    if (!author.length) {
      return { Message: 'Not Found author' };
    }
    return author;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Mongodb id noto'g'ro kritildi" };
    }
    let author = await this.AuthorSchema.findById(id);
    if (!author) {
      return { Message: 'Not found author id' };
    }
    return author;
  }

  async update(id: string, newdata: UpdateAuthorDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Mongodb id noto'g'ro kritildi" };
    }
    let author = await this.AuthorSchema.findById(id);
    if (!author) {
      return { Message: 'Not found author id' };
    }
    return await this.AuthorSchema.findByIdAndUpdate(id, newdata, {
      new: true,
    });
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Mongodb id noto'g'ro kritildi" };
    }
    let author = await this.AuthorSchema.findById(id);
    if (!author) {
      return { Message: 'Not found author id' };
    }
    return await this.AuthorSchema.findByIdAndDelete(id)
  }
}
