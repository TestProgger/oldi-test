import { getRepository } from "typeorm";
import { TokenStore } from "../entity/TokenStrore";
import { User } from "../entity/User";

export class TokenStoreService{

    private tokenRepository = getRepository(TokenStore);

    constructor(){}

    async insertToken(token : string  , userId : number, tokenLifeTimeHours : number  = 24):Promise<boolean>{
        let tokenEntity = await this.tokenRepository.findOne( { userId } );

        if( tokenEntity ){
            tokenEntity.token = token;
            tokenEntity.expirationTime = Date.now() + ( tokenLifeTimeHours * 60 * 60 * 1000 );
            await this.tokenRepository.merge( tokenEntity );
        }else
        {
            tokenEntity = new TokenStore();
            tokenEntity.token = token;
            tokenEntity.userId = userId;
            tokenEntity.expirationTime = Date.now() + ( tokenLifeTimeHours * 60 * 60 * 1000 );
            await this.tokenRepository.save( tokenEntity );
        }
        return !!tokenEntity;
    }

    async deleteToken( token : string ):Promise< boolean >
    {
        try{
            const tokenEntity = await this.tokenRepository.delete( { token }  );
            return true
        }catch(ex)
        {
            return false;
        }
        
    }

    async deleteTokenByUserId( userId : number ):Promise<boolean>
    {
        try{
            const tokenEntity = await this.tokenRepository.delete( { userId  }  );
            return true
        }catch(ex)
        {
            return false
        }
        
        
    }

    async getTokenEntity( token : string ):Promise<TokenStore|undefined>
    {
        return await this.tokenRepository.findOne({ token });
    } 

    async getTokenEntityByUserId( userId : number ):Promise<TokenStore|undefined>
    {
        return await this.tokenRepository.findOne( { userId } );
    }


}