import { Switch , Route , Redirect } from 'react-router-dom';
import { AuthPage } from '../pages/AuthPage/AuthPage';


export const useRoutes = ( isAuth : boolean ) => {

    if( isAuth )
    {
        return (
            <div>Loading ...</div>
        )
    }
    else
    {
        return (
            <Switch>
                <Route exact path="/auth" component={AuthPage} />
                <Redirect exact to="/auth" />
            </Switch>
        )
    }


}