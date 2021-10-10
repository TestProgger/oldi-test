import { FC , Fragment } from 'react';
import { Input } from '../../../../components/Input/Input';


import userIcon from '../../../../icons/user.png'
import { Button } from '../../../../components/Button/Button';
import { useState } from 'react';

export interface ResetFormInterface{
    resetPassword : ( username : string ) => void
    showAlert ?: ( errors : string[] ) => void
    hideAlert ?: () => void 
}


export const ResetForm : FC<ResetFormInterface> = ( { resetPassword } ) => {


    const [ username , setUsername ] = useState<string>('');
    const [ showNotify , setShowNotify ] = useState<boolean>(false);

    const onClick = () => {
        setShowNotify( true );
        resetPassword( username )
    }

    return (
        <Fragment>
            <h1 className="base-form-header header mb-50">  Reset </h1>
            <Input classNames="mb-25"  icon={userIcon} placeholder="Username" onChange ={ ( event ) => setUsername( event.target.value ) } onBlur = { () => {} } />
            
             <p  className={ showNotify ?  "mb-25 mt-10 notification" :  "mb-25 mt-10 notification not-visible"  }> A reset link will be sent to your E-Mail </p>
            
            <Button classNames = "mt-10" text = "send" onClick = { () => onClick() } />
        </Fragment>
    );

}