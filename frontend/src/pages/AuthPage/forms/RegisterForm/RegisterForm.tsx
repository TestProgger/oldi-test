import React, { FC, useState } from "react";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";


import './RegisterForm.css';

import userIcon from '../../../../icons/user.png';
import keyIcon from '../../../../icons/key.png';
import mailIcon from '../../../../icons/mail.png';
import { Socket } from "socket.io-client";

interface RegisterProps{
    showAlert : ( text :  string ) => void
    hideAlert : ( ) => void,
    io : Socket
}

export const RegisterForm : FC<RegisterProps> = ({ showAlert , hideAlert , io  }) => {
    const [ username , setUsername ] = useState<string>();
    const [ email , setEmail ] = useState<string>();
    const [ password , setPassword ] = useState<string>();
    const [ confPassword , setConfPassword ] = useState<string>();

    const checkUsername = () => {
        io.emit('checkUsername' , username  )
        io.on( 'usernameChecked' , ( error : string ) => {
            if( error.length )
            {
                showAlert( error )
            }
        } )
    }

    const checkEmail = () => {
        io.emit('checkEmail' , email  )
        io.on( 'emailChecked' , ( resp : { error ?: string } ) => {
            if( resp?.error )
            {
                console.log(resp.error)
                showAlert( resp.error )
            }else{
                hideAlert()
            }
        } )
    }

    const checkPassword = () => {
        io.emit('checkPassword' , { password  , confPassword } )
        io.on( 'passwordChecked' , () => {} );
    }
    
    return  (
        <div className="base-form register-form">
            <h1 className="base-form-header header" > Register </h1>
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value) }
                onBlur = {() => checkUsername() }
                inputType="text" placeholder="Username" icon={userIcon} classNames = "mb-15"  />
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value) }
                onBlur = {() => checkEmail() }
                inputType="email" placeholder="E-Mail" icon={mailIcon}  classNames = "mb-15" />
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value) }
                onBlur = {() => {} }
                inputType="password" placeholder="Password" icon={keyIcon} classNames = "mb-15"  />
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setConfPassword(event.target.value) }
                onBlur = {() => checkPassword() }
                inputType="password" placeholder="Confirm Password" icon={keyIcon}  classNames = "mb-15" />
            <Button text = "Proceed" onClick={() => showAlert('2342342')} />
        </div>
    )
}