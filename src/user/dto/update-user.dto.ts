import { ApiProperty } from "@nestjs/swagger";
import {IsPhoneNumber } from "class-validator";

export class UpdateUserDto{
    @ApiProperty({example:"Alex"})
    name?: string

    @ApiProperty({example: "+998930451852"})
    phone?: string

    @ApiProperty({example:"1234567"})
    password?: string

}
