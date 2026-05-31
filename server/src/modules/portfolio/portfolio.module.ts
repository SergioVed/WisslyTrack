import { Module } from "@nestjs/common";
import { PortfolioController } from "./interface/portfolioController";
import { PortfolioService } from "./core/portfolioService";
import { PortfolioRepositoryImpl } from "./infrastructure/portfolioRepositoryImpl";
import { UserModule } from "../users/user.module";
import { PrismaService } from "../../prismaService";
import { AuthGuard } from "../../guards/authGuard";
import { JwtService } from "@nestjs/jwt";
import { SupabaseService } from "./infrastructure/supabaseService";


@Module({
    imports: [UserModule],
    providers: [PortfolioService, PrismaService, JwtService, SupabaseService, AuthGuard, {
        provide: "IPortfolioRepository",
        useClass: PortfolioRepositoryImpl
    }],
    controllers: [PortfolioController],
})
export class PortfolioModule{}
