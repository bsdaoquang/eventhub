import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {EventsScreen, SearchEvents} from '../screens';

const EventNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="SearchEvents" component={SearchEvents} />
    </Stack.Navigator>
  );
};

export default EventNavigator;
