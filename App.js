import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './welcome';
import LoginScreen from './login';
import RegistrationScreen from './Register';
import HomeScreen from './home';
import BottomTabNavigator from './bottomTab';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="bottomTab" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
