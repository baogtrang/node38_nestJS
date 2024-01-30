import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator"
// npm i class-validator

export default class loginDTO {
    @ApiProperty({type: String, description: "email"})
    @IsEmail()
    email: string

    @ApiProperty({type: String, description: "pass_word"})
    @IsNotEmpty()
    pass_word: string
}