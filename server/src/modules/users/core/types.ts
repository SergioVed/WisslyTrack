

export interface CreateUserCommand {
    email: string,
    passwordHash: string
}

export interface UpdateUserCommand extends Partial<CreateUserCommand> {
    id: string
}
