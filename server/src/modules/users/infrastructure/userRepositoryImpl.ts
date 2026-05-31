import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prismaService";
import { CreateUserCommand, UpdateUserCommand } from "../core/types";
import { UserEntity } from "../core/userEntity";
import { IUserRepository } from "../core/userRepository";
import { UserMapper } from "./userMapper";
import e from "express";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {

    constructor(
        private prisma: PrismaService
    ){}

    async getAll(): Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany({include: {portfolio: true}})
        return users.map(user => UserMapper.toDomain(user))
    }

    async getById(id: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({where: {id: id}, include: {portfolio: true}})
        if (!user) {
            return null
        }
        return UserMapper.toDomain(user)
    }

    async getByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({where: {email: email}})
        if (!user) {
            return null
        }
        return UserMapper.toDomain(user)
    }

    async create(command: CreateUserCommand): Promise<UserEntity> {
        const user = await this.prisma.user.create({data: command})
        return UserMapper.toDomain(user)
    }

    async update(command: UpdateUserCommand): Promise<UserEntity | null> {
        const userToUpdate = await this.prisma.user.findUnique({where: {id: command.id}})
        if (!userToUpdate) {
            return null
        }

        const updatedUser = await this.prisma.user.update({where: {id: command.id}, data: command})
        console.log(updatedUser)
        return UserMapper.toDomain(updatedUser)
    }

    async delete(id: string): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }

   
    
}
