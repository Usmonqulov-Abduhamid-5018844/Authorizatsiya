import { ApiProperty, OmitType } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Role } from "../schema/authorizatsiya.schema"
export class UpdateAuthorizatsiyaDto {
    @ApiProperty({example: "usmonqulovabduhamid00@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({example: "12345678"})
    @IsNotEmpty()
    password: string
}

export class adminDto {
    @ApiProperty({example: "ADMIN || SUPPER_ADMIN"})
    @IsNotEmpty()
    @IsString()
    @IsEnum(Role)
    role: Role
}
