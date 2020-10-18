import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Feed from '../pages/Feed';

const {Navigator, Screen} = createStackNavigator();

function AppStack(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false}}>
                <Screen name="Login" component={Login}/>
                <Screen name="Feed" component={Feed}/>
            
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;