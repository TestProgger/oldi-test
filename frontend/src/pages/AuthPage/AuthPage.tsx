import { FC, useContext, useState } from "react";
import { LoginForm } from "./forms/LoginForm/LoginForm";
import { RegisterForm } from "./forms/RegisterForm/RegisterForm";
import "./AuthPage.css";

import { Alert } from "../../components/Alert/Alert";
import { AppContext } from "../../contexts/AppContext";
import { Socket } from "socket.io-client";
import { Validator } from "../../handlers/Validator";



export const AuthPage : FC = () => {

    const [ alertShown , setAlertShown ] = useState<boolean>(false);
    const [ alertText ,  setAlertText ] = useState<string>('');

    const { io }  = useContext(AppContext);

    const showAlert = ( text : string ) => {
        setAlertShown(true)
        setAlertText(text);
    }
    const hideAlert = ( ) => setAlertShown(false);

    const validator = new Validator( io as Socket , showAlert , hideAlert );

    return (
        <div className="auth-page-container">

            { alertShown ?  <Alert   text={alertText}/> : null }

            <div className="auth-page-form">

                <RegisterForm io = {io as Socket}  validator = { validator }/>

            </div>

        </div>
    )
}