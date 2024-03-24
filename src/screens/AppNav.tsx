import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from '../screens/Auth';
import TaskList from '../screens/TaskList';

const AppNav = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="TaskList" component={TaskList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNav;
