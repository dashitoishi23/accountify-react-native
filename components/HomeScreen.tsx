import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {dbOps} from '../util/db';
import {getAccountifyUser} from '../util/db/init';

const HomeScreen = () => {
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

  return <View></View>;
};

export default HomeScreen;
