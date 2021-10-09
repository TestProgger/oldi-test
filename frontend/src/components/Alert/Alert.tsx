import { FC } from "react";

import './Alert.css';

interface AlertProps {
    alertStrings : string[] 
}

export const Alert:FC<AlertProps> = ( { alertStrings } ) => {
    return (
        <div className = "custom-alert" >
            { alertStrings.map( (  str , ind ) => <p key={ind}>{ str }</p> ) }
        </div>
    )
}