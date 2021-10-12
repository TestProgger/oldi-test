import * as jwt from 'jsonwebtoken';
import { TokenStoreService } from '../services/TokenStoreService';
import { UIEvent } from '../enums/UserInteractionEnum'
import { UserService } from '../services/UserService';



export const PROTECTED_EVENTS = [ UIEvent.CHANGE_PROFILE_IMAGE , UIEvent.GET_PROFILE_IMAGE ];

export const AuthMiddleware = ( jwtSecret : string , authService : UserService  , tokenStoreService : TokenStoreService) =>  async ( packet : any[] , next : Function ) => {
    const [event ,  data ] = packet;
    const isProtected =  !!( PROTECTED_EVENTS.filter( item => item === event ).length );
    if( isProtected )
    {
        if( data?.token )
        {
            const isExpired = await tokenStoreService.isExpired( data.token );
            if( !isExpired )
            {
                const decoded : any = jwt.verify( data.token , jwtSecret );
                const user = await authService.getUserByUUID(decoded.uuid);
                if( !user ){ next( new Error( "Invalid Token" ));  }
                else{
                    if(data.data === {}){
                        packet[1] = { user };
                    }else
                    {
                        packet[1] = { ...data.data , user };
                    }
                    
                    next();
                }
                
            }else
            {
                next( new Error( "Token has expired" ));
            }
        }
        else
        {
            next(new Error( "Invalid Token" ) );
        }
    }
    else
    {
        packet[1] = { ...data.data };
        next();
    }
}
