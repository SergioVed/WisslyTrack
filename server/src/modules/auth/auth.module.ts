import { Module } from "@nestjs/common";
import { AuthService } from "./core/authService";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./interface/authController";
import { TokenHelper } from "./helper/tokenHelper";
import { UserModule } from "../users/user.module";
import { AuthGuard } from "../../guards/authGuard";


@Module({
    imports: [UserModule],
    providers: [AuthService, JwtService, TokenHelper],
    controllers: [AuthController],
})
export class AuthModule {}