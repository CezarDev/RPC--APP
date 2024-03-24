import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Auth from './screens/Auth';
import TaskList from './screens/TaskList';

// const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <>
      {/* <Auth /> */}
      <TaskList />
      </>
  );
}