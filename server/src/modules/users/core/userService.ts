import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { type IUserRepository } from "./userRepository";
import { CreateUserCommand, UpdateUserCommand } from "./types";


@Injectable()
export class UserService{

    constructor(
        @Inject("IUserRepository") private userRepo: IUserRepository
    ){}


    public getAll(){
        return this.userRepo.getAll()
    }

    public async getById(id: string){
        const user = await this.userRepo.getById(id)
        if (!user) {
            throw new NotFoundException(`User with id: ${id} not found`)
        }
        return user
    }

    public async findByEmail(email: string){
        return this.userRepo.getByEmail(email)
    }

    public async getByEmail(email: string){
        const user = await this.userRepo.getByEmail(email)
        if (!user) {
            throw new NotFoundException(`User with email: ${email} not found`)
        }
        return user
    }

    public create(command: CreateUserCommand){
        return this.userRepo.create(command)
    }

    public update(command: UpdateUserCommand){
        return this.userRepo.update(command)
    }

    public async delete(id: string){
        const userToDelete = await this.userRepo.delete(id)
        if (!userToDelete) {
            throw new NotFoundException(`User with id: ${id} not found`)
        }
        return userToDelete
    }
}
