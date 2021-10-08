import { FC } from 'react'


import './Input.css';

export interface InputProps{
    placeholder ?: string,
    icon ?: string ,
    inputType ?: "email" | "password" | "text",
    classNames ?: string,

    onClick ?: () => void
    onChange ?: () => void
    onFocus ?: () => void
    onBlur ?: () => void
}


export const Input : FC<InputProps> = ({inputType , placeholder  , icon , classNames  , onClick , onBlur , onChange , onFocus } : InputProps) => {
    return (
        <div className={ "custom-input " + classNames } >
          <input type={inputType} placeholder={placeholder} />
          <label> <img src={ icon } alt="" /> </label>
        </div>
    )
} 