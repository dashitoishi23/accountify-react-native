import React, { useEffect } from 'react';
import {Text} from 'react-native';
import initiateDBConnection from '../util/db';

const HomeScreen = () => {
  useEffect(() => {
    let dbInfo = initiateDBConnection();
  })

  return <Text>HOME SCREEN</Text>;
};

export default HomeScreen;
