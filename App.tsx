/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Transaction} from 'react-native-sqlite-storage';

import HomeScreen from './components/HomeScreen';
import {dbOps} from './util/db';
import {initDatabase} from './util/db/init';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  useEffect(() => {
    if (!dbOps.getDatabaseConnection()) {
      let tx: Transaction;
      (async () => {
        let isOpened = await dbOps.initiateDBConnection();
        console.log(isOpened);
        tx = await initDatabase();
        console.log(tx);
      })();
    } //open connection to SQLite database

    SplashScreen.hide();
  });

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
