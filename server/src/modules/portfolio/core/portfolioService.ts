import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IPortfolioRepository } from "./portfolioRepository";
import { CreatePortfolioCommand, UpdatePortfolioCommand } from "./types";
import { UserService } from "../../users/core/userService";


@Injectable()
export class PortfolioService{

    constructor(
        @Inject("IPortfolioRepository") private portfolioRepo: IPortfolioRepository,
        private userService: UserService
    ){}

    public async create(command: CreatePortfolioCommand, userId: string){
        const user = await this.userService.getById(userId)
        if (!user) {
            throw new NotFoundException(`User with id: ${userId} not found`)
        }

        if(user.portfolio()){
            throw new BadRequestException("Portfolio already exists")
        }       
        
        const portfolio = await this.portfolioRepo.create(command, userId)

        return portfolio
    }

    public async update(command: UpdatePortfolioCommand, userId: string){
        const user = await this.userService.getById(userId)
        if (!user) {
            throw new NotFoundException(`User with id: ${userId} not found`)
        }

        const portfolio = user.portfolio()
        if(!portfolio){
            throw new BadRequestException("Portfolio does not exist")
        }  
        
        const updatedPortfolio = await this.portfolioRepo.update(command, portfolio.id)
        if (!updatedPortfolio) {
            throw new BadRequestException(`Portfolio was not updated`)
        }

        return updatedPortfolio
    }

}