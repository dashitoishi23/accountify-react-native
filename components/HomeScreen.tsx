/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {dbOps} from '../util/db';
import {getAccountifyUser, initDatabase} from '../util/db/init';
import AffirmationButton from './common/AffirmationButton';

const HomeScreen: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  const [newUser, setIsNewUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [accountifyUser, setAccountifyUser] = useState(null);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    (async () => {
      await dbOps.initiateDBConnection();
      const dbConnection = dbOps.getDatabaseConnection();
      await initDatabase(dbConnection);
      const user = await getAccountifyUser(dbConnection);
      console.log('User', user.length);
      if (user.length === 0) {
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
        setAccountifyUser(user.item(0));
      }
      setIsLoading(false);
      console.log('NEW', newUser);
    })();
  }, [newUser]);

  return !isLoading ? (
    newUser ? (
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
    )
  ) : (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default HomeScreen;
