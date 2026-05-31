import { UUID } from "node:crypto";


export class PortfolioEntity {

    constructor(
        private _id: string,
        private _fullName: string,
        private _location: string,
        private _techStack: string[],
        private _role: string,
        private _cvPath?: string
    ){}


    get id(): string {
        return this._id;
    }

    get fullName(): string {
        return this._fullName;
    }

    get location(): string {
        return this._location;
    }

    get role(): string {
        return this._role;
    }

    get techStack(): string[] {
        return this._techStack;
    }

    get svPath(): string | undefined {
        return this._cvPath;
    }
}