import { Portfolio } from "../../../../generated/prisma/client";
import { PortfolioEntity } from "../core/portfolioEntity";


export class PortfolioMapper{

    public static toDomain(portfolio: Portfolio): PortfolioEntity {
        return new PortfolioEntity(
            portfolio.id,
            portfolio.fullName,
            portfolio.location,
            portfolio.techStack,
            portfolio.role,
            portfolio.cvPath ? portfolio.cvPath : undefined
        )
    }

}