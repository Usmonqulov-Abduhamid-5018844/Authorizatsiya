import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsNotEmpty } from "class-validator"

export class CreateBookDto {
    @ApiProperty({example: "book name"})
    @IsNotEmpty()
    name: string

    @ApiProperty({example: "badiy"})
    @IsNotEmpty()
    janor: string

    @ApiProperty({example: "authorid"})
    @IsMongoId()
    authorId: string
}
