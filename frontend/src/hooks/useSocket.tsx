import { useCallback } from 'react';
import {io , Socket} from 'socket.io-client';


export interface  UseSocketInterface{
    emit : ( emitString : string  , data : any ) => void,
    on : ( eventString : string  , listener : (...args:any[])=>void  ) => void
}

export const useSocket = (token : string  , apiEndpoint : string ) => {
    const socketIO : Socket = io(apiEndpoint);
    socketIO.connect(); 

    const emit = useCallback( ( emitString : string  , data : any ) => {
        socketIO.emit( emitString , { data , token } );
    }  , [])

    const on = useCallback( ( eventString : string  , listener : (...args:any[])=>void  ) => {
        socketIO.on( eventString  , listener );
    } , [] );

    return { emit , on }
} 