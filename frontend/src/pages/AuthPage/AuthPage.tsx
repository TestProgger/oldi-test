import { FC, useContext, useState } from "react";
import { LoginForm } from "./forms/LoginForm/LoginForm";
import { RegisterForm } from "./forms/RegisterForm/RegisterForm";


import { Alert } from "../../components/Alert/Alert";
import { AppContext } from "../../contexts/AppContext";
import { Validator } from "../../handlers/Validator";


import "./AuthPage.css";
import { RCForm } from "./forms/RCForm";
import { AuthService } from "../../service/AuthService";
import { UseSocketInterface } from "../../hooks/useSocket";


export const AuthPage : FC = () => {

    const [ alertShown , setAlertShown ] = useState<boolean>(false);
    const [ alertStrings ,  setAlertText ] = useState<string[]>([]);

    const { io }  = useContext(AppContext);

    const showAlert = ( response : string[] ) => {
        setAlertShown(true)
        setAlertText(response);
    }
    const hideAlert = () => setAlertShown(false);

    const validator = new Validator( io as UseSocketInterface , showAlert , hideAlert );
    const auth = new AuthService( io as UseSocketInterface  );

    const [ showLoginForm , setShowLoginForm ] = useState<boolean>(true);
    const [ showRegisterForm , setShowRegisterForm ] = useState<boolean>(false);
    const [ showRCForm , setShowRCForm ] = useState<boolean>(false);

    const forgotPassword = () => {
        setShowLoginForm(false) ; 
        setShowRCForm(true) ; 
        setAlertShown(false)
    }

    const changeFromRCToLogin = () => {
        setShowRCForm(false) ; 
        setShowLoginForm(true); 
        setAlertShown(false)
    }

    const changeFromRegisterToLogin = () => {
        setShowRegisterForm(false);
        setShowLoginForm(true);
        setAlertShown(false);
    }

    const changeFromLoginToRegister = () => {
        setShowLoginForm(false);
        setShowRegisterForm(true);
        setAlertShown(false);
    }


    return (
        <div className=" base-container auth-page-container">

            { alertShown ?  <Alert   alertStrings={alertStrings}/> : null }

            <div className="auth-page-form">

                { showLoginForm ? 
                    < LoginForm 
                        authService={auth} 
                        forgotFassword={ forgotPassword } 
                        changeToRegister = {changeFromLoginToRegister} 
                        showAlert = { showAlert }
                        hideAlert = { hideAlert}
                        /> : null }
                { showRegisterForm ? <RegisterForm  changeToLogin = {changeFromRegisterToLogin}  validator = { validator } authService={ auth } /> : null }
                { showRCForm ?  <RCForm validator = {validator}  authService = { auth  } changeToLogin = { changeFromRCToLogin  } showAlert = { (errors) => showAlert(errors) }  hideAlert = {  () => hideAlert()}/> : null }

            </div>

        </div>
    )
}