import { Portfolio, User } from "../../../../generated/prisma/client";
import { PortfolioMapper } from "../../portfolio/infrastructure/portfolioMapper";
import { UserEntity } from "../core/userEntity";

type UserWithOptionalPortfolio = User & {
    portfolio?: Portfolio | null
}

export class UserMapper {

    public static toDomain (user: UserWithOptionalPortfolio) {
        const portfolio = user.portfolio
            ? PortfolioMapper.toDomain(user.portfolio)
            : undefined

        return new UserEntity(user.id, user.email, user.passwordHash, portfolio)
    }

}
