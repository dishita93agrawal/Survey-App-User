import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './components/appStackNavigator';
import db from './config';
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer> 
  );
}; 

export default App;