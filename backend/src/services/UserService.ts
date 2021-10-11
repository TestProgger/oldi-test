import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { CreateUserDto } from "./dto/CreateUserDto";
import { v5 as uuidv5 , v4 as uuidv4 } from 'uuid'
import { hash , compare } from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from "./dto/LoginUserDto";
import { AuthError } from "../enums/AuthEnums";

export interface TokenInterface{
    uuid : string ,
    info : {
        id : number ,
        username : string
    }
    lifetime : number 
}


export class UserService{

    private userRepository = getRepository( User );

    constructor(
        private jwtSecret : string 

    ){
    }

    async createUser( {username , password , email} : CreateUserDto ): Promise<User | null >
    {

        const alreadyRegistered = await this.userRepository.count( { where : [ { username } , { email } ] } );

        if(  alreadyRegistered )
        {
            return null;
        }

        const user  = new User();
        user.email = email;
        user.password = password;
        user.username = username;
        return await this.userRepository.save( user );
    }

    async loginUser( { username , password } : LoginUserDto ): Promise<User | string >
    {
        const user = await this.userRepository.findOne( {  where : { username } } );
        if( !user ){ return AuthError.LOGIN_IDENTITY_NOT_FOUND }
        const isLogged  = await compare( password , user?.password as string  );
        if( isLogged ){ return user as User }
        return AuthError.LOGIN_PASSWORD_INCORRECT;
    }

    async getUserByUsername( username : string ): Promise<User | undefined>
    {
        return await this.userRepository.findOne({ where : { username }  } );
    }
    async getUserByUUID( uuid : string )
    {
        return await this.userRepository.findOne( { where : { uuid } } );
    }

    async getUserById( id : number  ) : Promise<User | undefined>{
        return await this.userRepository.findOne(id);
    }

    async changePassword( id : number , password : string ):Promise<User | null>
    {
        const user  = await this.userRepository.findOne(id) ;
        if( user instanceof User )
        {
            user.password = password
        }
        return await this.userRepository.save(user  as User );
    }

    async createTempToken( user : User ): Promise< string >
    {
        const { secret } = user;
        const date  = new Date();
        const payload =  await hash( secret + date.toLocaleString('ru') , 10);
        return jwt.sign( payload , this.jwtSecret )
    }

    async createToken( user : User ): Promise<string>
    {
        const { secret , id , uuid } = user;
        const payload = {  
            uuid,
            data : await hash( JSON.stringify( { secret  , id , uuid } ) , 10 ) 
        };
        const token = jwt.sign( payload , this.jwtSecret );
        return token;
    }

}