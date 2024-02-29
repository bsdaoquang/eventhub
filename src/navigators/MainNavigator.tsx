import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import {EventDetail} from '../screens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
