import { CreateUserCommand, UpdateUserCommand } from "./types";
import { UserEntity } from "./userEntity";


export interface IUserRepository {
    getAll(): Promise<UserEntity[]>
    getById(id: string): Promise<UserEntity | null>
    getByEmail(email: string): Promise<UserEntity | null>

    create(command: CreateUserCommand): Promise<UserEntity>
    update(command: UpdateUserCommand): Promise<UserEntity | null>
    delete(id: string): Promise<UserEntity | null>
}
