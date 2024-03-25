import React, {useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';

import Auth from '../screens/Auth';
import TaskList from '../screens/TaskList';
import {AuthContext} from "../context/AuthContext";
import Logo from "../components/Logo";

function AppNav() {
    
  const { isLoading, userToken } = useContext(AuthContext);
    
  if(isLoading) 
        return ( <Logo /> )

    return (
        <NavigationContainer>
            {userToken ? (
                <TaskList />
            ) : (
                <Auth />
            )}
        </NavigationContainer>
    );
}

export default AppNav;
