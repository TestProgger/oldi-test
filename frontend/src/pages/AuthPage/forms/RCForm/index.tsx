import { FC  , useState} from "react";

import { ResetForm } from "./ResetForm";
import { ConfirmationForm } from "./ConfirmationForm";

import './index.css';
import { useContext } from "react";
import { AppContext } from "../../../../contexts/AppContext";
import { AuthService } from "../../../../service/AuthService";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { Validator } from "../../../../handlers/Validator";
import { useHistory } from "react-router";

export interface ResetFormInterface{
    authService : AuthService
    showAlert : ( errors : string[] ) => void
    hideAlert : () => void
    changeToLogin : () => void
    validator : Validator  
}


export const RCForm : FC<ResetFormInterface> = ({ validator ,  authService ,  showAlert , hideAlert , changeToLogin }) => {

    const [ showConfirm , setShowConfirm ] = useState<boolean>(false);
    const [ showResetUser, setShowResetUser ] = useState<boolean>(true);
    const [ showResetPassword , setShowResetPassword ] = useState<boolean>(false);
    const { login , token } = useContext(AppContext);
    const [ tmpToken , setTmpToken ] = useState<string>('');

    const history = useHistory();
    
    const checkCode = ( code : string  ) => {
        authService.checkConfirmationCode( { token : tmpToken , code } , ( response ) => {
            console.log(response);
            if( response?.error ) { showAlert( response.error ) }
            else{ 
                hideAlert() ; 
                setShowConfirm(false);
                setShowResetPassword(true);
            }
        } )
    }

    const resetUser = ( username  : string ) => {
        authService.resetUser( {  username }  , ( response) => {
            if( response?.error ){ showAlert( response.error) }
            else{ setTmpToken(response)  ; hideAlert(); setTimeout( () => { setShowResetUser(false) ;  setShowConfirm( true ) } , 2000) }
        } )
    }

    const resetPassword  = ( password : string  , confPassword : string ) => {
        authService.resetPassword( { password , confPassword , token : tmpToken } , ( response ) => {
            if( response?.error ){ showAlert( response.error) }
            else{
                hideAlert();
                history.go(0);
            }
        }  )
    } 


    return (
        <div className = "base-form reset-form">
            { showConfirm ? 
                <ConfirmationForm ckeckCode = { checkCode } /> 
                : 
                null
            }

            { showResetUser ?  < ResetForm changeToLogin = {changeToLogin} resetUser = { resetUser }/> : null }

            { showResetPassword ?  <ResetPasswordForm validator = { validator } resetPassword={resetPassword} /> : null }

        </div>
    )
}