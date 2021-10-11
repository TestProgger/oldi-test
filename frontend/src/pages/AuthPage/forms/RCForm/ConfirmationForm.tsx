import { FC, Fragment, useState } from "react";
import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import keyIcon from '../../../../icons/key.png';

export interface ConfirmationFormInterface{
    ckeckCode : ( code : string  ) => void
    showAlert ?: ( errors : string[] ) => void
    hideAlert ?: () => void
}

export const ConfirmationForm : FC<ConfirmationFormInterface> = ({ ckeckCode }) => {
   
    const [ code  , setCode ] = useState<string>('')

    return (
        <Fragment>
            <h1 className="base-form-header header mb-50">  Confirmation </h1>
            <Input classNames="mb-25"  icon={keyIcon} placeholder="Confirmation Code" onChange ={ ( event ) => setCode( event.target.value ) } onBlur = { () => {} } />
            
            <Button classNames = "mt-10" text = "send" onClick = { () => ckeckCode(code) } />
        </Fragment>
    )

}