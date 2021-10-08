import { FC, Fragment } from "react";


import './Error.css';

export interface ErrorProps{
    head  ?: string
    isShown : boolean
    text ?: string
}



export const Error : FC<ErrorProps> = ({ head  , isShown , text } : ErrorProps) => {
    return (
        <div className="custom-error">
            { 
                isShown ? 
                    <Fragment>
                        <p className="error-head" > { head } </p>
                        <p className="error-body" > { text } </p>
                    </Fragment>
                :
                null
            }
        </div>
    )
}