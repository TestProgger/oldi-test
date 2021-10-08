import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";



export const localStorageName  = "oldy_token";

export interface AuthInterface{
    token : string  | null | undefined
    setToken : React.Dispatch< React.SetStateAction<string|null> >
    apiEndpoint : string
    login : ( resp_token : string ) => void
    logout : ( ) => void 
}

export const useAuth = () : AuthInterface => {
    const [ token , setToken ] = useState<string | null>('');
    const apiEndpoint = "http://" + window.location.host.split(":")[0] + ":5000/api";

    const history = useHistory();
    const historyLocation = history.location.pathname; 

    const login = useCallback(( resp_token : string ) => {
        setToken( resp_token );
        localStorage.setItem( localStorageName , resp_token );
        history.push( historyLocation === "/auth" ? "/" : historyLocation )
    } , []);

    const logout = useCallback( () => {
        setToken( null );
        localStorage.removeItem(localStorageName);
        history.go(0);
    }  , [])

    return { token  , setToken , apiEndpoint , login  , logout };

}