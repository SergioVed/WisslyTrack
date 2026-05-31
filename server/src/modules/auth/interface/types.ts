import { IsEmail, IsString, MinLength } from "class-validator"

export class UserRegisterDto {

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string
}

export class UserLoginDto extends UserRegisterDto {}