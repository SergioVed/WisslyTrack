import { PartialType } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"
import { isSourceFile } from "typescript"


export class CreatePortfolioDto{

    @IsString()
    fullName!: string

    @IsString()
    location!: string

    @IsString()
    role!: string

    @IsArray()
    @IsString({each: true})
    techStack!: string[]

}

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto){}