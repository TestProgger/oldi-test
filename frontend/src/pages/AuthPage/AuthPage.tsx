import { FC, useContext, useState } from "react";
import { LoginForm } from "./forms/LoginForm/LoginForm";
import { RegisterForm } from "./forms/RegisterForm/RegisterForm";


import { Alert } from "../../components/Alert/Alert";
import { AppContext } from "../../contexts/AppContext";
import { Socket } from "socket.io-client";
import { Validator } from "../../handlers/Validator";


import "./AuthPage.css";
import { RCForm } from "./forms/RCForm";


export const AuthPage : FC = () => {

    const [ alertShown , setAlertShown ] = useState<boolean>(false);
    const [ alertStrings ,  setAlertText ] = useState<string[]>([]);

    const { io }  = useContext(AppContext);

    const showAlert = ( response : string[] ) => {
        setAlertShown(true)
        setAlertText(response);
    }
    const hideAlert = ( ) => setAlertShown(false);

    const validator = new Validator( io as Socket , showAlert , hideAlert );

    return (
        <div className="auth-page-container">

            { alertShown ?  <Alert   alertStrings={alertStrings}/> : null }

            <div className="auth-page-form">

                <RCForm io = { io as Socket } showAlert = { (errors) => showAlert(errors) }  hideAlert = {  () => hideAlert()}/>

            </div>

        </div>
    )
}