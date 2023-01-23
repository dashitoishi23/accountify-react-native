import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {dbOps} from '../util/db';
import SplashScreen from 'react-native-splash-screen';

const HomeScreen = () => {
  useEffect(() => {
    let dbInfo = dbOps.initiateDBConnection();

    SplashScreen.hide();
  });

  return <Text>HOME SCREEN</Text>;
};

export default HomeScreen;
