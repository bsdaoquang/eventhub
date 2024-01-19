import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ForgotPassword,
  LoginScreen,
  SignUpScreen,
  Verication,
} from '../screens';
import OnbroadingScreen from '../screens/auth/OnbroadingScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnbroadingScreen" component={OnbroadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verication" component={Verication} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
