/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {dbOps} from '../util/db';
import {getAccountifyUser, initDatabase} from '../util/db/init';
import AffirmationButton from './common/AffirmationButton';
import {getDimensions} from '../util/getDimensions';
import {AccountifyUser} from '../util/db/models/accountifyUser';
import currencyMasker from '../util/currencyMasker';
import {getSpendsObject} from '../util/getSpendsObject';

const HomeScreen: React.FC<{
  navigation: any;
  route: any;
}> = ({navigation, route}) => {
  const [newUser, setIsNewUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [accountifyUser, setAccountifyUser] = useState<AccountifyUser | null>(
    null,
  );
  const [date, setDate] = useState(new Date());
  const [spendsObject, setSpendsObject] = useState<any>();
  const {windowHeight, windowWidth} = getDimensions();
  const theme = useTheme();
  useEffect(() => {
    console.log('route', route);
    (async () => {
      if (route.params && route.params.currentUser) {
        setIsNewUser(false);
        setAccountifyUser(route.params.currentUser);
        const spends = await getSpendsObject(route.params.currentUser);
        setSpendsObject(spends);
        setIsLoading(false);
      } else {
        await dbOps.initiateDBConnection();
        const dbConnection = dbOps.getDatabaseConnection();
        await initDatabase(dbConnection);
        const user = await getAccountifyUser(dbConnection);
        console.log('User', user.length);
        if (user.length === 0) {
          setIsNewUser(true);
        } else {
          setIsNewUser(false);
          const spends = await getSpendsObject(user.item(0));
          setSpendsObject(spends);
          setAccountifyUser(user.item(0));
        }
        setIsLoading(false);
        console.log('NEW', newUser);
      }
    })();
  }, []);

  return !isLoading ? (
    newUser ? (
      <View style={{backgroundColor: theme.colors.background}}>
        <AffirmationButton
          onPressCallback={() => {
            navigation.navigate('Settings');
          }}
          text="Add your details to get started"
        />
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: theme.colors.background,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 40}}>Hello, here are your finances</Text>
        <View
          style={{
            backgroundColor: theme.colors.onPrimary,
            borderRadius: 30,
            padding: 20,
          }}>
          <Text style={{fontSize: 35}}>Needs</Text>
          <Text style={{fontSize: 25}}>
            {accountifyUser?.defaultCurrency}{' '}
            {currencyMasker(spendsObject.needs.remaining.toString())} remaining
          </Text>
          <Text style={{fontSize: 25}}>
            {spendsObject.needs.percentage}% remaining
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.onPrimary,
            borderRadius: 30,
            padding: 20,
          }}>
          <Text style={{fontSize: 35}}>Wants</Text>
          <Text style={{fontSize: 25}}>
            {accountifyUser?.defaultCurrency}{' '}
            {currencyMasker(spendsObject.wants.remaining.toString())} remaining
          </Text>
          <Text style={{fontSize: 25}}>
            {spendsObject.wants.percentage}% remaining
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.onPrimary,
            borderRadius: 30,
            padding: 20,
          }}>
          <Text style={{fontSize: 35}}>Savings</Text>
          <Text style={{fontSize: 25}}>
            {accountifyUser?.defaultCurrency}{' '}
            {currencyMasker(spendsObject.savings.remaining.toString())}{' '}
            remaining
          </Text>
          <Text style={{fontSize: 25}}>
            {spendsObject.savings.percentage}% remaining
          </Text>
        </View>
      </View>
    )
  ) : (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default HomeScreen;
