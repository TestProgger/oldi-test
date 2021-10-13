import React, { FC } from 'react'


import './Input.css';

export interface InputProps{
    placeholder ?: string,
    icon ?: string ,
    inputType ?: "email" | "password" | "text",
    classNames ?: string,

    onClick ?: (event : React.MouseEvent<HTMLInputElement>) => void
    onChange : ( (event : React.ChangeEvent<HTMLInputElement>) => void ) | ( () => void )
    onFocus ?: (event : React.FocusEvent<HTMLInputElement>) => void
    onBlur : ( ( event : React.FocusEvent<HTMLInputElement>) => void ) | ( () => void )
}


export const Input : FC<InputProps> = ({inputType , placeholder  , icon , classNames  , onClick , onBlur , onChange , onFocus } : InputProps) => {
    return (
        <div className={ "custom-input " + classNames } >
          <input 
                onBlur = { (event : React.FocusEvent<HTMLInputElement>) => onBlur(event) } 
                onChange = { ( event : React.ChangeEvent<HTMLInputElement> ) => onChange(event) }
                type={inputType} placeholder={placeholder} />
          <label> <img src={ icon } alt="" /> </label>
        </div>
    )
} 