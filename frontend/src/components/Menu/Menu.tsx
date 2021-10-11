
import './Menu.css';

import burgerIcon from '../../icons/burger.png';
import gridIcon  from '../../icons/grid.png'
import defaultProfileImage from '../../icons/defaultProfile.png';
import logOutIcon from '../../icons/log-out.png';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

export const Menu = () => {

    const [ showLogOut , setShowLogOut ] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [profileImage , setProfileImage ] = useState<string>('');
    const { logout } = useContext(AppContext);
    const changeProfileImage = ( event : React.MouseEvent<HTMLInputElement>) => {
        if ( inputRef.current?.files && inputRef.current.files[0] )
        {
           const fileReader  = new FileReader();
           fileReader.onload = () => setProfileImage( fileReader.result as string );
           const file  = inputRef.current.files[0];
        
            fileReader.readAsDataURL( file );
        }
          
    }

    return (
        <div className="menu" style = {showLogOut ?  { width : '360px' } : {} } >

            <div className={ showLogOut ? "logOut" : "logOut d-none" } onClick = { () => { if(logout) logout() } }>
                <img src={logOutIcon} alt="" />
            </div>

            <div className={ showLogOut ? "burger" : "burgerWithoutLogOut" }  onClick = { () => setShowLogOut(!showLogOut) }>
                <img src={showLogOut ? gridIcon : burgerIcon} alt="" />
            </div>

            <div className={showLogOut ?  "profileImage" : "profileWithoutLogOut" } onClick = { () => inputRef.current?.click() } >
                <img src={ profileImage ? profileImage : defaultProfileImage } alt="" ref = {imageRef}   />
                <input type="file" accept = "image/*" ref={inputRef} className="d-none" onClick ={ (event) => changeProfileImage(event) } />
            </div>

        </div>
    )

}