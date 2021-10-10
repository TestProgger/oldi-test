import { FC  , useState} from "react";

import { ResetForm } from "./ResetForm";
import { Socket } from "socket.io-client";
import { ConfirmationForm } from "./ConfirmationForm";

import './index.css';
import { AuthEmit, AuthEvent } from "../../../../enums/AuthEnums";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../../contexts/AppContext";

export interface ResetFormInterface{
    io : Socket
    showAlert : ( errors : string[] ) => void
    hideAlert : () => void
}


export const RCForm : FC<ResetFormInterface> = ({ io , showAlert , hideAlert }) => {

    const [ showConfirm , setShowConfirm ] = useState<boolean>(false);
    const { login , token } = useContext(AppContext);

    
    const checkCode = ( code : string  ) => {
        io.emit( AuthEmit.CONFIRMATION , code );
        io.on( AuthEvent.CONFIRMED , ( response ) => {
            if( response?.error ) { showAlert( response.error ) }
            else{ hideAlert() }
        });
    }

    const resetPassword = ( username  : string ) => {
        io.emit( AuthEmit.RESET , username );
        io.on( AuthEvent.RESETED , ( response) => {
            if( response?.error ){ showAlert( response.error) }
            else{ hideAlert(); setTimeout( () => setShowConfirm( true ) , 2000) }
        } );
    }

    useEffect( () => {
        io.emit( 'getToken');
        io.on('getToken' , ( token ) => {
            if( login ){ login(token) }
            io.emit( 'profileImage' , {token  , data : [1,2,3,4]});
            io.on( 'profileImage' , () => {} )
        })
        
    } , [] ); 


    return (
        <div className = "base-form reset-form">
            { showConfirm ? 
                <ConfirmationForm ckeckCode = { (code) => checkCode(code) } /> 
                : 
                < ResetForm  resetPassword  = { ( username ) => resetPassword(username) }/>
            }
        </div>
    )
}