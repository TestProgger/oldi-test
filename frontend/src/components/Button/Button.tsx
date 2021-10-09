import { FC } from "react";


import './Button.css';

export interface ButtonProps {
    text : string ,
    onClick : ( ) => void,
    classNames ?: string
}

export const Button : FC<ButtonProps> = ({ text , onClick , classNames }  : ButtonProps) => {
    return (
        <button onClick = { () => onClick() }  className = {classNames  ?  "custom-button " + classNames : "custom-button"} > { text } </button>
    )
}