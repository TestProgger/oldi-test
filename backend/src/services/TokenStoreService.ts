import { getRepository } from "typeorm";
import { TokenStore } from "../entity/TokenStrore";
import { User } from "../entity/User";

export class TokenStoreService{

    private tokenRepository = getRepository(TokenStore);

    constructor(){}

    async insertToken(token : string  , user : User, tokenLifeTimeHours : number  = 24):Promise<boolean>{
        let tokenEntity = await this.tokenRepository.findOne( { where : { user } } );
        if ( tokenEntity ){
            tokenEntity.token = token;
            tokenEntity.expirationTime = Date.now() + ( tokenLifeTimeHours * 60 * 60 * 1000 );
            await this.tokenRepository.merge( tokenEntity );
        }
        else{
            tokenEntity = new TokenStore()
            tokenEntity.token = token;
            tokenEntity.user = user;
            tokenEntity.expirationTime = Date.now() + ( tokenLifeTimeHours * 60 * 60 * 1000 );
            await this.tokenRepository.save(tokenEntity);
        }

        return tokenEntity instanceof TokenStore;
    }

    async deleteToken( token : string ):Promise< boolean >
    {
        const tokenEntity = await this.tokenRepository.delete( { token }  );
        return !!tokenEntity?.affected;
    }

    async deleteTokenByUser( user : User ):Promise<boolean>
    {
        const tokenEntity = await this.tokenRepository.delete( { user }  );
        return !!tokenEntity?.affected;
    }

    async getTokenEntity( token : string ):Promise<TokenStore|undefined>
    {
        return await this.tokenRepository.findOne({ token });
    } 

    async getTokenEntityByUser( user : User ):Promise<TokenStore|undefined>
    {
        return await this.tokenRepository.findOne( { user } );
    }


}