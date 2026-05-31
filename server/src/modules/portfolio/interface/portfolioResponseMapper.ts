import { PortfolioEntity } from "../core/portfolioEntity";


export class PortfolioResponseMapper {

    public static toResponse(portfolio: PortfolioEntity){
        return {
            id: portfolio.id,
            fullName: portfolio.fullName,
            location: portfolio.location,
            techStack: portfolio.techStack,
            role: portfolio.role,
            cvPath: portfolio.cvPath
        }
    }

}