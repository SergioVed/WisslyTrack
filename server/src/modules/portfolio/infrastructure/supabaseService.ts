import { BadRequestException, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";


@Injectable()
export class SupabaseService{

    private supabase: SupabaseClient

    constructor(){
        const url = process.env.SUPABASE_URL
        const role_key = process.env.SERVICE_ROLE_KEY

        if(!url){
            throw new Error("SUPABASE_URL is missing")
        }

        if(!role_key){
            throw new Error("ROLE_KEY is missing")
        }

        this.supabase = createClient(
            url,
            role_key
        )
    }

    public async uploadFile(file: Express.Multer.File, userId: string){
        if(!file){
            throw new BadRequestException("No file was provided")
        }
        if(file.mimetype !== "application/pdf"){
            throw new BadRequestException("File should be pdf")
        }

        const path = `${userId}-cv.pdf`

        const {error} = await this.supabase.storage
            .from("cvs")
            .upload(path, file.buffer, {
                upsert: true
            })

        if(error){
            console.log(error)
            throw new BadRequestException("Smth went wrong")
        }

        return path

    } 

}