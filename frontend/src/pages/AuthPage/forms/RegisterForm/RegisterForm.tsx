import React, { FC, useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";


import './RegisterForm.css';

import userIcon from '../../../../icons/user.png';
import keyIcon from '../../../../icons/key.png';
import mailIcon from '../../../../icons/mail.png';

import { Validator } from "../../../../handlers/Validator";
import { AuthService } from '../../../../service/AuthService';
import { AppContext } from "../../../../contexts/AppContext";
import { Role, RoleSelector } from "../../../../components/RoleSelector/RoleSelector";

interface RegisterProps{
    validator : Validator
    authService : AuthService
    changeToLogin : () => void
}

export const RegisterForm : FC<RegisterProps> = ({ validator ,  authService , changeToLogin  }) => {
    const [ username , setUsername ] = useState<string>('');
    const [ email , setEmail ] = useState<string>('');
    const [ password , setPassword ] = useState<string>('');
    const [ confPassword , setConfPassword ] = useState<string>('');
    const [ roleId , setRoleId ] = useState<number>(1);
    const [ roles , setRoles ] = useState<Role[]>([]);

    const {login} = useContext(AppContext);

    const createUser = () =>   authService.createUser( { username , email , password , roleId } , (response) => {
        if( response?.error )
        {
            validator.showAlert( response.error );
        }else{
            if (login)
                login(response);
        }   
    } );

    useEffect( () => {
        authService.getRoles( setRoles );
    } , [] )
    
    return  (
        <div className="base-form register-form">
            <RoleSelector roles = { roles } classNames={["ml-60p" , "mt-25"]} setRole = { setRoleId } />
            <h1 className="base-form-header header" > Register </h1>
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value) }
                onBlur = {() => validator.validateUsername( username ) }
                inputType="text" placeholder="Username" icon={userIcon} classNames = "mb-15"  />
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value) }
                onBlur = {() => validator.validateEmail( email )}
                inputType="email" placeholder="E-Mail" icon={mailIcon}  classNames = "mb-15" />
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value) }
                onBlur = {() => {} }
                inputType="password" placeholder="Password" icon={keyIcon} classNames = "mb-15"  />
            <Input 
                onChange = { (event : React.ChangeEvent<HTMLInputElement>) => setConfPassword(event.target.value) }
                onBlur = {() => validator.validatePassword(password , confPassword) }
                inputType="password" placeholder="Confirm Password" icon={keyIcon}  classNames = "mb-15" />
            <Button text = "Proceed" onClick={() =>  validator.isValid ?  createUser() : {}} />
            <a className = "mb-25 mt-5 base-link fs-15" onClick = {( event : React.MouseEvent<HTMLAnchorElement> ) => { event.preventDefault() ; changeToLogin() }  } > Login </a>
        </div>
    )
}