import { FC } from "react";

import './Alert.css';

interface AlertProps {
    text : string 
}

export const Alert:FC<AlertProps> = ( { text } ) => {
    return (
        <div className = "custom-alert" >
            <p>{text}</p>
        </div>
    )
}