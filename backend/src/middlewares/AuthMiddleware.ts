import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';



export const PROTECTED_EVENTS = [ 'profileImage' ];

export const AuthMiddleware = ( jwtSecret : string , authService : UserService ) =>  async ( packet : any[] , next : Function ) => {
    const [event ,  data ] = packet;
    
    

    if( event in PROTECTED_EVENTS )
    {
        if( data?.token )
        {
            const decoded : any = jwt.verify( data.token , jwtSecret );
            const user = await authService.getUserByUUID(decoded.uuid);
            packet[1] = { ...data.data , user };
            next();
        }
        else
        {
            next( new Error( "Invalid Token" ));
        }
    }
    else
    {
        packet[1] = { ...data.data };
        next();
    }
}
