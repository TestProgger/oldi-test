import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as fs from 'fs/promises'
export class UserInteractionService{

    private userRepository = getRepository(User);
    private stdPath : string  = './public/profileImages/'; 
    constructor(  
    ){ }

    async changeProfileImage( profileImage : string , userId : number   )
    {   
        try{
            const user = await this.userRepository.findOne(userId);
            if( user instanceof User ){
                await fs.writeFile( this.stdPath + user?.username + ".base64" , profileImage );
                user.profileImage = this.stdPath + user?.username + ".base64";
            }
            
            await this.userRepository.save(user as User);
        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    async getProfileImage( user : User) : Promise< string | null >
    {
        try{
            if( user.profileImage.length )
            {
                const image = await fs.readFile( user.profileImage );
                return image.toString();
            }
            
        }catch(ex)
        {
            console.log(ex)
        }
        return null
    }
    


}