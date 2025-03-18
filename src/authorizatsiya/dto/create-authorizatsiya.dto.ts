import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from "class-validator";
import { Role } from "../schema/authorizatsiya.schema";

export class CreateAuthorizatsiyaDto {
    @ApiProperty({example: "Abduhamid"})
    @IsNotEmpty()
    name: string

    @ApiProperty({example: "+998930451852"})
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string

    @ApiProperty({example: "usmonqulovabduhamid00@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({example:"12345678"})
    @Length(4,10)
    @IsNotEmpty()
    password: string
}
