import { Injectable, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import mongoose, { Model } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private BookSchema: Model<Book>) {}

  async create(data: CreateBookDto) {
    let { name } = data;
    let book = await this.BookSchema.findOne({ name });
    if (book) {
      return { Message: 'book name exists' };
    }
    return await this.BookSchema.create(data);
  }

  async findAll() {
    let book = await this.BookSchema.find().populate('authorId');
    if (!book.length) {
      return { Message: 'Not Fount book' };
    }
    return book;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Mongo id noto'g'ri kritildi" };
    }
    let book = await this.BookSchema.findById(id).populate("authorId")
    if (!book) {
      return { Message: 'Not Fount bookId' };
    }
    return book;
  }

  async update(id: string, data: UpdateBookDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Mongo id noto'g'ri kritildi" };
    }
    let book = await this.BookSchema.findById(id);
    if (!book) {
      return { Message: 'Not Fount bookId' };
    }
    return await this.BookSchema.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return {Message: "Mongo id noto'g'ri kritildi"};
    }
    let book = await this.BookSchema.findById(id)
    if(!book){
      return {Message: "Not Fount bookId"};
    }
    return await this.BookSchema.findByIdAndDelete(id)
  }
}
