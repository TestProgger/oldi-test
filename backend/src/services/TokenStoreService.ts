import { getRepository } from "typeorm";
import { TokenStore } from "../entity/TokenStrore";

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

    async isExpired( token :  string  ):Promise<boolean>
    {
        try {
            const tokenEntity = await this.tokenRepository.findOne({ where : { token }  })
            const isExpired = Date.now() >= ( tokenEntity?.expirationTime as number );
            if( isExpired ) { await this.tokenRepository.delete( { id : tokenEntity?.id } ) }
            return isExpired ; 
        }catch(ex){
            return true;
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