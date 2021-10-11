
import './Menu.css';

import burgerIcon from '../../icons/burger.png';
import defaultProfileImage from '../../icons/defaultProfile.png';
import logOutIcon from '../../icons/log-out.png';
import React, { useState } from 'react';
import { useRef } from 'react';

export const Menu = () => {

    const [ showLogOut , setShowLogOut ] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [profileImage , setProfileImage ] = useState<string>('');

    const changeProfileImage = ( event : React.MouseEvent<HTMLInputElement>) => {
        if ( inputRef.current?.files )
        {
            setProfileImage( window.URL.createObjectURL( inputRef.current.files[0] ) )
        }
          
    }

    return (
        <div className="menu">

            {  showLogOut ? 
                <div className="logOut">
                    <img src={logOutIcon} alt="" />
                </div>
                :
                null
            }


            <div className={ showLogOut ? "burger" : "burgerWithoutLogOut" }  onClick = { () => {} }>
                <img src={burgerIcon} alt="" />
            </div>

            <div className={showLogOut ?  "profileImage" : "profileWithoutLogOut" } onClick = { () => inputRef.current?.click() } >
                <img src={ profileImage ? profileImage : defaultProfileImage } alt="" ref = {imageRef}   />
                <input type="file" accept = "image/*" ref={inputRef} className="d-none" onClick ={ (event) => changeProfileImage(event) } />
            </div>

        </div>
    )

}