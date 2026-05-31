import { UUID } from "node:crypto";
import { PortfolioEntity } from "./portfolioEntity";
import { CreatePortfolioCommand, UpdatePortfolioCommand } from "./types";


export interface IPortfolioRepository {
    create(command: CreatePortfolioCommand, userId: string): Promise<PortfolioEntity>
    update(command: UpdatePortfolioCommand, id: string): Promise<PortfolioEntity | null>
    get(userId: UUID): Promise<PortfolioEntity | null>
}