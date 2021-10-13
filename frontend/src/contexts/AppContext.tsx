import React, { createContext } from "react";
import { UseSocketInterface } from "../hooks/useSocket";



export interface AppContextInterface{
    token ?: string | null
    setToken ?: React.Dispatch< React.SetStateAction<string|null> >


    username ?: string | null
    setUsername ?: React.Dispatch< React.SetStateAction<string|null> >
    
    profileImage ?: string | null
    setProfileImage ?: React.Dispatch< React.SetStateAction<string|null> >

    io ?: UseSocketInterface
    apiEndpoint ?: string
    login ?: ( resp_token : string ) => void
    logout ?: () => void 
}


export const AppContext = createContext<AppContextInterface>({});