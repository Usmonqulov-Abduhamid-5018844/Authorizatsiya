import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class CreateAuthorDto {
    @ApiProperty({example: "alex"})
    @IsNotEmpty()
    name: string

    @ApiProperty({example: "1999"})
    @IsNotEmpty()
    @Type(()=> Number)
    year: number

    @ApiProperty({example: "francfurd"})
    @IsNotEmpty()
    location: string
}
