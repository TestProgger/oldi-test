import { FC } from "react";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";


import './RegisterForm.css';

import userIcon from '../../../../icons/user.png';
import keyIcon from '../../../../icons/key.png';
import mailIcon from '../../../../icons/mail.png';

export const RegisterForm : FC = () => {
    return  (
        <div className="base-form register-form">
            <h1 className="base-form-header header" > Register </h1>
            <Input inputType="text" placeholder="Username" icon={userIcon} classNames = "mb-15"  />
            <Input inputType="email" placeholder="E-Mail" icon={mailIcon}  classNames = "mb-15" />
            <Input inputType="password" placeholder="Password" icon={keyIcon} classNames = "mb-15"  />
            <Input inputType="password" placeholder="Confirm Password" icon={keyIcon}  classNames = "mb-15" />
            <Button text = "Proceed" onClick={() => {}} />
        </div>
    )
}