import { FC } from 'react';
import { Input } from '../../../../components/Input/Input';


import './ResetForm.css';
import userIcon from '../../../../icons/user.png'
import { Button } from '../../../../components/Button/Button';
import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { AuthEmit, AuthEvent } from '../../../../enums/AuthEnums';

export interface ResetFormInterface{
    io : Socket,
}


export const ResetForm : FC<ResetFormInterface> = ( { io } ) => {


    const [ username , setUsername ] = useState<string>('');

    const resetPassword = () => {
        io.emit( AuthEmit.RESET , username );
        io.on( AuthEvent.RESETED , ( data ) => {} );
    }

    return (
        <div className="base-form reset-form">
            <h1 className="base-form-header header mb-25">  Reset </h1>
            <Input classNames="mb-25"  icon={userIcon} placeholder="Username" onChange ={ ( event ) => setUsername( event.target.value ) } onBlur = { () => {} } />
            
            <p  className="mb-25 mt-10 notification"> A reset link will be sent to your E-Mail </p>
            
            <Button classNames = "mt-10" text = "send" onClick = { () => {} } />
        
        </div>
    );

}