import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayload, AuthenticatedUser } from "../modules/auth/helper/types";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private jwt: JwtService
    ){}
    
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const header = request.headers.authorization
        if (!header) {
            throw new UnauthorizedException();
        }

        const [type, token] = header.split(" ")
        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwt.verifyAsync<AccessTokenPayload>(token, {
                secret: process.env.JWT_SECRET_ACCESS
            })

            request.user = {
                id: payload.sub,
                email: payload.email
            } satisfies AuthenticatedUser

            return true

        } catch (e) {
            throw new UnauthorizedException();
        }
    }

}
