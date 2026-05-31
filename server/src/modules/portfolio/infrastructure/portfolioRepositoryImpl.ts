import { Inject, Injectable } from "@nestjs/common";
import { IPortfolioRepository } from "../core/portfolioRepository";
import { UUID } from "node:crypto";
import { PortfolioEntity } from "../core/portfolioEntity";
import { CreatePortfolioCommand, UpdatePortfolioCommand } from "../core/types";
import { PrismaService } from "../../../prismaService";
import { PortfolioMapper } from "./portfolioMapper";


@Injectable()
export class PortfolioRepositoryImpl implements IPortfolioRepository{

    constructor(
        private prisma: PrismaService
    ){}


    public async create(command: CreatePortfolioCommand, userId: string): Promise<PortfolioEntity> {
        const portfolio = await this.prisma.portfolio.create({data: {
            ...command,
            user: {
                connect: {id: userId}
            }
        }})
        return PortfolioMapper.toDomain(portfolio);
    }

    public async update(command: UpdatePortfolioCommand, id: string): Promise<PortfolioEntity | null> {
        const updatedPortfolio = await this.prisma.portfolio.update({data: command, where: {id: id}})
        if (!updatedPortfolio) {
            return null
        }
        return PortfolioMapper.toDomain(updatedPortfolio)
    }

    get(userId: UUID): Promise<PortfolioEntity | null> {
        throw new Error("Method not implemented.");
    }

}