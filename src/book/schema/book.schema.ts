import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Author } from 'src/author/schema/author.schema';

@Schema()
export class Book extends Document {
  @Prop()
  name: string;

  @Prop()
  janor: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  authorId: Author;
}
export const BookSchema = SchemaFactory.createForClass(Book)
