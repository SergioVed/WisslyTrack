import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LoginUserCommand, RegisterUserCommand } from "./types";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../prismaService";
import * as bcrypt from "bcrypt"
import { UserService } from "../../users/core/userService";
import { TokenHelper } from "../helper/tokenHelper";


@Injectable()
export class AuthService {

    constructor (
        private userService: UserService,
        private tokenHelper: TokenHelper
    ) {}

    public async register (command: RegisterUserCommand) {
        const userToRegister = await this.userService.findByEmail(command.email)
        if (userToRegister) {
            throw new BadRequestException(`User with email ${command.email} already exists`)
        }
        const passwordHash = await bcrypt.hash(command.password, 10)
        const user = await this.userService.create({email: command.email, passwordHash: passwordHash})

        const tokens = await this.tokenHelper.generateTokens(user)
        return tokens

    }

    public async login (command: LoginUserCommand) {
        
        const userToLogin = await this.userService.getByEmail(command.email)
        if (!userToLogin) {
            throw new NotFoundException(`User with email ${command.email} not found`)
        }

        const isPasswordCorrect = await bcrypt.compare(command.password, userToLogin.passwordHash())
        if (!isPasswordCorrect) {
            throw new BadRequestException("Password is incorrect")
        }

        const tokens = await this.tokenHelper.generateTokens(userToLogin)
        return tokens

    }

    public async logout () {

    }

}