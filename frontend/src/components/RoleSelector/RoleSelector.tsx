import React, { FC } from 'react';
import './RoleSelector.css';


export interface Role{
    id : number 
    name : string 
}

interface RoleSelectorInterface{
    roles : Role[],
    classNames : string[] ,
    setRole : ( ...args : any[] ) => void
}


export const RoleSelector : FC<RoleSelectorInterface> = ({ roles  , classNames , setRole}) => {
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