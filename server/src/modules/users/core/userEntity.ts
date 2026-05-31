import { UUID } from "node:crypto"
import { PortfolioEntity } from "../../portfolio/core/portfolioEntity"


export class UserEntity {

    constructor(
        private _id: string,
        private _email: string,
        private _passwordHash: string,
        private _portfolio?: PortfolioEntity
    ) {}

    public id () {
        return this._id
    }

    public email () {
        return this._email
    }

    public passwordHash () {
        return this._passwordHash
    }

    public portfolio(){
        return this._portfolio
    }

}
