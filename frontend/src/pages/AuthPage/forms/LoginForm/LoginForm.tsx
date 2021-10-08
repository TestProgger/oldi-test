import React, { FC, useState } from 'react';
import { Input } from "../../../../components/Input/Input";
import { Button } from '../../../../components/Button/Button';
import { Error } from '../../../../components/Error/Error';

import './LoginForm.css';

import userIcon from '../../../../icons/user.png';
import keyIcon from '../../../../icons/key.png';

export const LoginForm : FC = () => {

    const clk = () => console.log("click");

    const [ username , setUsername ] = useState<string>();
    const [ password ,  setPassword ] = useState<string>();



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
                    inputType="password" placeholder="Password" icon={keyIcon}  classNames = "mb-15" />
            <Button text = "Proceed" onClick={clk} />
            <Error isShown = { false } head="ident Error" text="rebuild your brain" />
        </div>
    )
}