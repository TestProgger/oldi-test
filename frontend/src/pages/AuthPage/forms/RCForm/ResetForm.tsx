import { FC , Fragment } from 'react';
import { Input } from '../../../../components/Input/Input';


import userIcon from '../../../../icons/user.png'
import { Button } from '../../../../components/Button/Button';
import { useState } from 'react';

export interface ResetFormInterface{
    resetUser : ( username : string ) => void
    changeToLogin : () => void
    showAlert ?: ( errors : string[] ) => void
    hideAlert ?: () => void 
}


export const ResetForm : FC<ResetFormInterface> = ( { resetUser , changeToLogin } ) => {


    const [ username , setUsername ] = useState<string>('');
    const [ showNotify , setShowNotify ] = useState<boolean>(false);

    const onClick = () => {
        setShowNotify( true );
        resetUser( username )
    }

    return (
        <Fragment>
            <h1 className="base-form-header header mb-50">  Reset </h1>
            <Input classNames=""  icon={userIcon} placeholder="Username" onChange ={ ( event ) => setUsername( event.target.value ) } onBlur = { () => {} } />
            <a className = "mb-25 login" onClick = {( event : React.MouseEvent<HTMLAnchorElement> ) => { event.preventDefault() ; changeToLogin() }} > Login ? </a>
            
             <p  className={ showNotify ?  "mb-25 mt-10 notification" :  "mb-25 mt-10 notification not-visible"  }> A reset link will be sent to your E-Mail </p>
            
            <Button classNames = "mt-10" text = "Send" onClick = { () => onClick() } />
        </Fragment>
    );

}