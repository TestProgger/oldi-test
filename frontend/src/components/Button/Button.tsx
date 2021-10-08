import { FC } from "react";


import './Button.css';

export interface ButtonProps {
    text : string ,
    onClick : ( ) => void
}

export const Button : FC<ButtonProps> = ({ text , onClick }  : ButtonProps) => {
    return (
        <button onClick = { () => onClick() }  className = "custom-button" > { text } </button>
    )
}