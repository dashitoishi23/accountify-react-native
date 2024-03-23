/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import HomeScreen from './components/HomeScreen';
import {Provider as PaperProvider, MD3DarkTheme} from 'react-native-paper';
import SettingsScreen from './components/SettingsScreen';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer theme={DarkTheme}>
      <PaperProvider theme={MD3DarkTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
