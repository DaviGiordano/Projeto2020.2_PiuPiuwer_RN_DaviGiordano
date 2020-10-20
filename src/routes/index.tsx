import React from 'react';

import AppRoutes from './app.routes';
//import AuthRoutes from './auth.routes';
import { useAuth } from '../contexts/auth'
import AuthRoutes from './auth.routes';


const Routes: React.FC = () => {
    const { user, token } = useAuth();
    //console.log(token);
    return(
        !!token?
        <AppRoutes/>
        : <AuthRoutes/>
    );
}

export default Routes;