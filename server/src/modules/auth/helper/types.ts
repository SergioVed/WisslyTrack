import { UUID } from "node:crypto";


export interface AccessTokenPayload {
    sub: string,
    email: string
}

export interface AuthenticatedUser {
    id: string,
    email: string
}