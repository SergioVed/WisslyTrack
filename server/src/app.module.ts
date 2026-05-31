import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/users/user.module";
import { PortfolioModule } from "./modules/portfolio/portfolio.module";

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ".env" }),
        AuthModule, UserModule, PortfolioModule
    ],
})
export class AppModule {}