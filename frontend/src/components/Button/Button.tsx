import { FC } from "react";


import './Button.css';

export interface ButtonProps {
    text : string ,
    onClick : ( ) => void,
    classNames ?: string
    disabled ?: boolean
}

export const Button : FC<ButtonProps> = ({ text , onClick , classNames , disabled }  : ButtonProps) => {
    return (
        <button disabled = {disabled} onClick = { () => onClick() }  className = {classNames  ?  "custom-button " + classNames : "custom-button"} > { text } </button>
    )
}