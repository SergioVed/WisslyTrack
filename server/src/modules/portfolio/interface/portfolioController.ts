import { BadRequestException, Body, Controller, Get, Post, Put, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { PortfolioService } from "../core/portfolioService";
import { CreatePortfolioDto, UpdatePortfolioDto } from "./types";
import { Request } from "express";
import { AuthenticatedUser } from "../../auth/helper/types";
import { AuthGuard } from "../../../guards/authGuard";
import { PortfolioResponseMapper } from "./portfolioResponseMapper";
import { FileInterceptor } from "@nestjs/platform-express";
import { SupabaseService } from "../infrastructure/supabaseService";
import { UserService } from "../../users/core/userService";

type AuthenticatedRequest = Request & {
    user: AuthenticatedUser
}

@Controller("/portfolio")
export class PortfolioController{

    constructor(
        private portfolioService: PortfolioService,
        private supabaseService: SupabaseService,
        private userService: UserService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() dto: CreatePortfolioDto,
        @Req() req: AuthenticatedRequest
    ){
          
        const portfolio = await this.portfolioService.create(dto, req.user.id)
        return PortfolioResponseMapper.toResponse(portfolio)
    }

    @Put()
    @UseGuards(AuthGuard)
    async update(
        @Body() dto: UpdatePortfolioDto,
        @Req() req: AuthenticatedRequest
    ){
        const updatedPortfolio = await this.portfolioService.update(dto, req.user.id)
        return PortfolioResponseMapper.toResponse(updatedPortfolio)
    }

    @Put("/cv")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("cv"))
    async uploadCv(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: AuthenticatedRequest
    ){
        const path = await this.supabaseService.uploadFile(file, req.user.id)
        const updatedPortfolio = await this.portfolioService.update({cvPath: path}, req.user.id)

        return PortfolioResponseMapper.toResponse(updatedPortfolio)
    }

    @Get("/cv-review")
    @UseGuards(AuthGuard)
    async reviewCv(
        @Req() req: AuthenticatedRequest
    ){
        const user = await this.userService.getById(req.user.id)

        const portfolio = user.portfolio()

        if (!portfolio) {
            throw new BadRequestException("There is no portfolio")
        }

        if (!portfolio.cvPath) {
            throw new BadRequestException("There is no cv")
        }
    
        const fileText = await this.supabaseService.getFileText(portfolio.cvPath);
        return fileText
    }

}
