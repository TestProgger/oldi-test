import { FC, useContext, useState } from "react";
import { LoginForm } from "./forms/LoginForm/LoginForm";
import { RegisterForm } from "./forms/RegisterForm/RegisterForm";
import "./AuthPage.css";

import { Alert } from "../../components/Alert/Alert";
import { AppContext } from "../../contexts/AppContext";
import { Socket } from "socket.io-client";



export const AuthPage : FC = () => {

    const [ alertShown , setAlertShown ] = useState<boolean>(false);
    const [ alertText ,  setAlertText ] = useState<string>('');

    const { io }  = useContext(AppContext);

    const showAlert = ( text : string ) => {
        setAlertShown(true)
        setAlertText(text);
    }
    const hideAlert = ( ) => setAlertShown(false);

    return (
        <div className="auth-page-container">

            { alertShown ?  <Alert   text={alertText}/> : null }

            <div className="auth-page-form">

                <RegisterForm io = {io as Socket} showAlert = {(text:string ) =>  showAlert(text)} hideAlert = {() => hideAlert()}/>

            </div>

        </div>
    )
}