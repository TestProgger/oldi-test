
import './Menu.css';

import burgerIcon from '../../icons/burger.svg';
import gridIcon  from '../../icons/grid.svg'
import defaultProfileImage from '../../icons/defaultProfile.png';
import logOutIcon from '../../icons/log-out.svg';
import React, { useEffect, useState } from 'react';
import { useRef , FC } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';


interface MenuInterface{
    profileImage : string
    setProfileImage :  ( ...args:any[]) => void
}

export const Menu : FC<MenuInterface> = ({ profileImage , setProfileImage }) => {

    const [ showLogOut , setShowLogOut ] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // const [profileImage , setProfileImage ] = useState<string>('');

    const { logout } = useContext(AppContext);
    const changeProfileImage = ( event : React.ChangeEvent<HTMLInputElement>) => {
        if ( event.target.files && event.target.files[0] )
        {
           const fileReader  = new FileReader();
           fileReader.onload = () => setProfileImage( fileReader.result );
            fileReader.readAsDataURL( event.target.files[0] );
        }
          
    }

    return (
        <div className="menu" style = {showLogOut ?  { width : '360px' } : {} } 
            
            >

            <div className={ showLogOut ? "logOut" : "logOut d-none" } onClick = { () => { if(logout) logout() } }>
                <img src={logOutIcon} alt="" />
            </div>

            <div className="burger"  onClick = { () => setShowLogOut(!showLogOut) }>
                <img src={showLogOut ? gridIcon : burgerIcon} alt="" />
            </div>

            <div className="profileImage" onClick = { () => inputRef.current?.click() } >
                <div className="image">
                    <img src={ profileImage ? profileImage : defaultProfileImage } alt="" ref = {imageRef}   />
                </div>
                
                <input type="file" accept = "image/*" ref={inputRef} className="d-none" onChange ={ (event) => changeProfileImage(event) } />
            </div>

        </div>
    )

}