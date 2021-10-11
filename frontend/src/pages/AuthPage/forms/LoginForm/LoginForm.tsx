import React, { FC, useContext, useState } from 'react';
import { Input } from "../../../../components/Input/Input";
import { Button } from '../../../../components/Button/Button';

import './LoginForm.css';

import userIcon from '../../../../icons/user.png';
import keyIcon from '../../../../icons/key.png';
import { AuthService } from '../../../../service/AuthService';
import { AppContext } from '../../../../contexts/AppContext';

interface LoginFormInterface{
    authService : AuthService
    forgotFassword : () => void
    changeToRegister : () => void
    showAlert : (errors : string[] ) => void
    hideAlert : () => void
}

export const LoginForm : FC<LoginFormInterface> = ( { authService , forgotFassword , changeToRegister , showAlert , hideAlert } ) => {

    const clk = () => console.log("click");

    const [ username , setUsername ] = useState<string>('');
    const [ password ,  setPassword ] = useState<string>('');

    const { login } = useContext(AppContext);

    const loginUser = (  ) => {
        authService.loginUser({ username , password } , ( response ) => {
            if( response?.error ){ showAlert( response.error ) }
            else{
                hideAlert();
                if( login)
                    login( response );
            }
        })
    }

    return (
        <div className = "base-form login-form">
            <h1 className="base-form-header header" > Login </h1>
            <Input  
                onChange = { (event : React.ChangeEvent<HTMLInputElement> ) => setUsername( event.target.value ) } 
                onBlur = { ( ) => {} }
                inputType="text" placeholder="Username" icon={userIcon} classNames = "mb-15"  />

            <Input 
                    onChange = { (event : React.ChangeEvent<HTMLInputElement> ) => setPassword( event.target.value ) } 
                    onBlur = { ( ) => {} }
                    inputType="password" placeholder="Password" icon={keyIcon}   />
            
            <a className = "mb-25 base-link mt-5 forgot-password" onClick = {( event : React.MouseEvent<HTMLAnchorElement> ) => { event.preventDefault() ; forgotFassword()}  } > Forgot password ? </a>


            <Button text = "Proceed" onClick={loginUser} />
            <a className = "mb-25 mt-5 base-link fs-15" onClick = {( event : React.MouseEvent<HTMLAnchorElement> ) => { event.preventDefault() ; changeToRegister()}  } > Registration </a>
        </div>
    )
}