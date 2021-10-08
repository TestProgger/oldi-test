import { FC } from "react";
import { LoginForm } from "./forms/LoginForm/LoginForm";

import "./AuthPage.css";




export const AuthPage : FC = () => {
    return (
        <div className="auth-page-container">

            <div className="auth-page-form">
                <LoginForm/>
            </div>

        </div>
    )
}