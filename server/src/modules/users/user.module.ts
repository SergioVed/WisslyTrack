import { Module } from "@nestjs/common";
import { UserService } from "./core/userService";
import { UserController } from "./interface/userController";
import { UserRepositoryImpl } from "./infrastructure/userRepositoryImpl";
import { PrismaService } from "../../prismaService";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "../../guards/authGuard";


@Module({
    providers: [UserService, PrismaService, JwtService, AuthGuard, {
        provide: "IUserRepository",
        useClass: UserRepositoryImpl
    }],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
