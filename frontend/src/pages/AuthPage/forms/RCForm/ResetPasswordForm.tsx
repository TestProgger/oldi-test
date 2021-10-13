import { FC, useState , Fragment } from "react";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import keyIcon from '../../../../icons/key.png'
import { Validator } from "../../../../handlers/Validator";

interface ResetPasswordFormInterface{
    validator : Validator
    resetPassword : (password : string  , confPassword : string) => void
}

export const ResetPasswordForm : FC<ResetPasswordFormInterface> = ({ validator , resetPassword }) => {

    const [ password , setPassword ] = useState<string>('');
    const [ confPassword , setConfPassword ] = useState<string>('');

    return (
        <Fragment>
            <h1 className="base-form-header header mb-50">  Enter Password </h1>
            <Input inputType="password" classNames="mb-25"  
                    icon={keyIcon} placeholder="Password" 
                    onChange ={ ( event ) => setPassword( event.target.value ) } 
                    onBlur = { () => {} } />
            <Input inputType="password" classNames="mb-25"  
                    icon={keyIcon} placeholder="Confirm Password" 
                    onChange ={ ( event ) => setConfPassword( event.target.value ) } 
                    onBlur = { () => validator.validatePassword(password , confPassword) } />
            <Button disabled = { password !== confPassword  } classNames = "mt-10" text = "Send" onClick = { () => resetPassword( password , confPassword ) } />
        </Fragment>
    )

}