import React, { FC , useState } from 'react';
import './RoleSelector.css';


export interface Role{
    id : number 
    name : string 
}

interface RoleSelector{
    roles : Role[],
    classNames : string[] ,
    setRole : ( ...args : any[] ) => void
}


export const RoleSelector : FC<RoleSelector> = ({ roles  , classNames , setRole}) => {
    return(
        <div className={ "role-selector "}>
            <select className = {classNames.join(' ') } onChange = { ( event : React.ChangeEvent<HTMLSelectElement> ) => setRole( +event.target.value  ) }>
                {
                    roles.map( role => <option value={role.id} key={role.id}> { role.name } </option> )
                }
            </select>
        </div>
    )
}