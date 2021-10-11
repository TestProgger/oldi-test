import { FC  , useState} from "react";

import { ResetForm } from "./ResetForm";
import { ConfirmationForm } from "./ConfirmationForm";

import './index.css';
import { useContext } from "react";
import { AppContext } from "../../../../contexts/AppContext";
import { AuthService } from "../../../../service/AuthService";

export interface ResetFormInterface{
    authService : AuthService
    showAlert : ( errors : string[] ) => void
    hideAlert : () => void
    changeToLogin : () => void
}


export const RCForm : FC<ResetFormInterface> = ({ authService ,  showAlert , hideAlert , changeToLogin }) => {

    const [ showConfirm , setShowConfirm ] = useState<boolean>(false);
    const { login , token } = useContext(AppContext);
    const [ tmpToken , setTmpToken ] = useState<string>('');

    
    const checkCode = ( code : string  ) => {
        authService.checkConfirmationCode( { token : tmpToken , code } , ( response ) => {
            console.log(response);
            if( response?.error ) { showAlert( response.error ) }
            else{ hideAlert() ; console.log( 'code code' ); }
        } )
    }

    const resetUser = ( username  : string ) => {
        authService.resetUser( {  username }  , ( response) => {
            if( response?.error ){ showAlert( response.error) }
            else{ setTmpToken(response)  ; hideAlert(); setTimeout( () => setShowConfirm( true ) , 2000) }
        } )
    }


    return (
        <div className = "base-form reset-form">
            { showConfirm ? 
                <ConfirmationForm ckeckCode = { (code) => checkCode(code) } /> 
                : 
                < ResetForm changeToLogin = {changeToLogin} resetUser  = { resetUser }/>
            }
        </div>
    )
}