import React from 'react';
import Feed from '../pages/Feed';

import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => (
    <Navigator screenOptions={{headerShown:false}}>
        <Screen name='Feed' component={Feed} />
    </Navigator>
);

export default AppRoutes;