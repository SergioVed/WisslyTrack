import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { UserService } from "../core/userService";
import { UUID } from "node:crypto";
import { AuthGuard } from "../../../guards/authGuard";
import { UsersResponseMapper } from "./usersResponseMapper";


@Controller("/user")
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Get()
    @UseGuards(AuthGuard)
    async getAll(){
        const users = await this.userService.getAll()
        return users.map(user => UsersResponseMapper.toResponse(user))
    }

    @Get("/get-by-email/:email")
    async getByEmail(
        @Param("email") email: string
    ){
        const user = await this.userService.getByEmail(email)
        return UsersResponseMapper.toResponse(user)
    }

    @Get("/:id")
    async getById(
        @Param("id", ParseUUIDPipe) id: UUID
    ){
        const user = await this.userService.getById(id)
        return UsersResponseMapper.toResponse(user)

    }


}