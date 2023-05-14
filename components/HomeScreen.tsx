/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {dbOps} from '../util/db';
import {getAccountifyUser} from '../util/db/init';
import AffirmationButton from './common/AffirmationButton';

const HomeScreen: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  const [newUser, setIsNewUser] = useState(true);
  const [accountifyUser, setAccountifyUser] = useState(null);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const dbConnection = dbOps.getDatabaseConnection();
    if (dbConnection) {
      async () => {
        const user = await getAccountifyUser();
        if (user.length !== 0) {
          setIsNewUser(true);
        } else {
          setAccountifyUser(user.item(0));
        }
      };
    }
  });

  return newUser ? (
    <View>
      <AffirmationButton
        onPressCallback={() => {
          navigation.navigate('Settings');
        }}
        text="Add your details to get started"
      />
    </View>
  ) : (
    <View>
      <AffirmationButton
        onPressCallback={() => console.log('Pressed')}
        text="Old User"
      />
    </View>
  );
};

export default HomeScreen;
