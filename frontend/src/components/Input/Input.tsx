import { FC, ReactNode } from 'react'


import './Input.css';

export interface InputProps{
    placeholder ?: string,
    icon ?: string ,
    inputType ?: "email" | "password" | "text",
    classNames ?: string
}


export const Input : FC<InputProps> = ({inputType , placeholder  , icon , classNames  } : InputProps) => {
    return (
        <div className={ "custom-input " + classNames } >
          <input type={inputType} placeholder={placeholder} />
          <label> <img src={ icon } alt="" /> </label>
        </div>
    )
} 