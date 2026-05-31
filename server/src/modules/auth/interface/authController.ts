import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "../core/authService";
import { UserLoginDto, UserRegisterDto } from "./types";

@Controller("/auth")
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post("/register")
    async register(@Body() dto: UserRegisterDto) {
        return await this.authService.register(dto)
    }

    @Post("/login")
    async login(@Body() dto: UserLoginDto) {
        return await this.authService.login(dto)
    }

}