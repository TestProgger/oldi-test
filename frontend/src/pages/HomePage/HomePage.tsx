import { FC, Fragment, useContext, useEffect } from "react";
import { Menu } from "../../components/Menu/Menu";
import { AppContext } from "../../contexts/AppContext";
import { UseSocketInterface } from "../../hooks/useSocket";
import { UserInteractionService } from "../../service/UserInteractionService";


import './HomePage.css';

export const HomePage:FC = () => {

    const { profileImage , setProfileImage , io } = useContext(AppContext);
    const userInteractionService = new UserInteractionService(io as UseSocketInterface);

    const changeProfileImage = ( image : string ) => {
        if ( setProfileImage ) { setProfileImage( image ) } ;
        userInteractionService.changeProfileImage( { image  } , console.log );
    }

    useEffect( () => {
        userInteractionService.getProfileImage( ( image ) => { if( setProfileImage ) { setProfileImage(image as string) } } )
    } , [] );

    return (

        <Fragment>
            <Menu profileImage={profileImage as string} setProfileImage = {changeProfileImage  } />
            <div className=" base-container home-container">
                
                

                <h1> Home Page </h1>
            
            
            </div>
        </Fragment>

    )

}