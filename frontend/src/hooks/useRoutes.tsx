import { Switch , Route , Redirect } from 'react-router-dom';
import { AuthPage } from '../pages/AuthPage/AuthPage';
import { HomePage } from '../pages/HomePage/HomePage';


export const useRoutes = ( isAuth : boolean ) => {

    if( isAuth )
    {
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Redirect exact to="/" />
            </Switch>
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