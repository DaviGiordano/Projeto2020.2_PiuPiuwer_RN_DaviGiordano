import React from 'react';
import Login from '../pages/Login';

import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Navigator screenOptions={{headerShown:false}}>
        <Screen name='Login' component={Login} />
    </Navigator>
);

export default AuthRoutes;