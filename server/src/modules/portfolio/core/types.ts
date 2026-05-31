

export interface CreatePortfolioCommand{
    fullName: string,
    location: string,
    role: string,
    techStack: string[],
}

export interface UpdatePortfolioCommand extends Partial<CreatePortfolioCommand>{
    cvPath?: string
}