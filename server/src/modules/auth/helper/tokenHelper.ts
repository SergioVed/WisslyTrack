import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../../users/core/userEntity";
import { Injectable } from "@nestjs/common";
import { AccessTokenPayload } from "./types";

@Injectable()
export class TokenHelper {

    constructor(
        private jwt: JwtService
    ){}

    public async generateTokens (user: UserEntity) {
        const payload: AccessTokenPayload = {
            sub: user.id(),
            email: user.email()
        }

        const accessToken = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_SECRET_ACCESS,
            expiresIn: '15m'
        })

        const refreshToken = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_SECRET_REFRESH,
            expiresIn: '30d'
        })

        return {
            accessToken,
            refreshToken
        }
    }

}