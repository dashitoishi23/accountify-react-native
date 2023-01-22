import React, { useEffect } from 'react';
import {Text} from 'react-native';
import { dbOps } from '../util/db';

const HomeScreen = () => {
  useEffect(() => {
    let dbInfo = dbOps.initiateDBConnection()
  })

  return <Text>HOME SCREEN</Text>;
};

export default HomeScreen;
