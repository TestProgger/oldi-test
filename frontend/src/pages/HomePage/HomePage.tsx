import { FC, Fragment } from "react";
import { Menu } from "../../components/Menu/Menu";


import './HomePage.css';

export const HomePage:FC = () => {

    return (

        <Fragment>
            <Menu/>
            <div className=" base-container home-container">
                
                

                <h1> Home Page </h1>
            
            
            </div>
        </Fragment>

    )

}