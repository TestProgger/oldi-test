import { FC } from 'react';
import { Input } from "../../../../components/Input/Input";
import { Button } from '../../../../components/Button/Button';
import { Error } from '../../../../components/Error/Error';

import './LoginForm.css';

import userIcon from '../../../../icons/user.png';
import keyIcon from '../../../../icons/key.png';

export const LoginForm : FC = () => {

    const clk = () => console.log("click");

    return (
        <div className = "base-form login-form">
            <h1 className="header" > Login </h1>
            <Input inputType="text" placeholder="Username" icon={userIcon} classNames = "mb-15"  />
            <Input inputType="password" placeholder="Password" icon={keyIcon}  classNames = "mb-15" />
            <Button text = "Proceed" onClick={clk} />
            <Error isShown = { false } head="ident Error" text="rebuild your brain" />
        </div>
    )
}