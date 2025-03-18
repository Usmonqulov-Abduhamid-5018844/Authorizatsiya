import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Author extends Document {
    @Prop()
    name: string

    @Prop()
    year: number

    @Prop()
    location: string
    
}
export const Authorschema =  SchemaFactory.createForClass(Author);
