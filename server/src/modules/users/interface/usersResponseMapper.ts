import { PortfolioResponseMapper } from "../../portfolio/interface/portfolioResponseMapper";
import { UserEntity } from "../core/userEntity";


export class UsersResponseMapper {

    public static toResponse(user: UserEntity){
        const portfolio = user.portfolio()

        return {
            id: user.id(),
            email: user.email(),
            portfolio: portfolio ? PortfolioResponseMapper.toResponse(portfolio) : null
        }
    }

}
