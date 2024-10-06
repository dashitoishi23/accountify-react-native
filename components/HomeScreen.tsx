/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {dbOps} from '../util/db';
import {getAccountifyUser, initDatabase} from '../util/db/init';
import AffirmationButton from './common/AffirmationButton';
import {getDimensions} from '../util/getDimensions';
import {AccountifyUser} from '../util/db/models/accountifyUser';
import {currencyMasker} from '../util/currencyMasker';
import {getSpendsObject} from '../util/getSpendsObject';
import BottomNavigationComponent from './common/BottomNavigationComponent';

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
      <View
        style={{
          backgroundColor: theme.colors.background,
          display: 'flex',
          flex: 3,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}>
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
          paddingLeft: 10,
          paddingRight: 10,
          flex: 2,
          flexDirection: 'column',
          backgroundColor: theme.colors.background,
          justifyContent: 'space-evenly',
        }}>
        <Text style={{fontSize: 35}}>
          Hello, here are your balances for this month
        </Text>
        <View
          style={{display: 'flex', justifyContent: 'space-evenly', flex: 2}}>
          <View
            style={{
              backgroundColor: theme.colors.onPrimary,
              borderRadius: 30,
              padding: 20,
            }}>
            <Text style={{fontSize: 35}}>Needs</Text>
            <Text
              style={{
                fontSize: 25,
                color: spendsObject.needs.percentage > 0 ? 'white' : 'red',
              }}>
              {accountifyUser?.defaultCurrency}{' '}
              {currencyMasker(spendsObject.needs.remaining.toString())}{' '}
              {spendsObject.needs.remaining > 0 ? 'remaining' : 'overspent'}
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: spendsObject.needs.percentage > 0 ? 'white' : 'red',
              }}>
              {spendsObject.needs.remaining > 0
                ? `${Math.floor(spendsObject.needs.percentage)}% remaining`
                : `${Math.abs(
                    Math.floor(spendsObject.needs.percentage),
                  )}% overspent`}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.onPrimary,
              borderRadius: 30,
              padding: 20,
            }}>
            <Text style={{fontSize: 35}}>Wants</Text>
            <Text
              style={{
                fontSize: 25,
                color: spendsObject.wants.percentage > 0 ? 'white' : 'red',
              }}>
              {accountifyUser?.defaultCurrency}{' '}
              {currencyMasker(spendsObject.wants.remaining.toString())}{' '}
              {spendsObject.wants.remaining > 0 ? 'remaining' : 'overspent'}
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: spendsObject.wants.percentage > 0 ? 'white' : 'red',
              }}>
              {spendsObject.wants.remaining > 0
                ? `${Math.floor(spendsObject.wants.percentage)}% remaining`
                : `${Math.abs(
                    Math.floor(spendsObject.wants.percentage),
                  )}% overspent`}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.onPrimary,
              borderRadius: 30,
              padding: 20,
            }}>
            <Text style={{fontSize: 35}}>Savings</Text>
            <Text
              style={{
                fontSize: 25,
                color: spendsObject.savings.percentage > 0 ? 'white' : 'red',
              }}>
              {accountifyUser?.defaultCurrency}{' '}
              {currencyMasker(spendsObject.savings.remaining.toString())}{' '}
              {spendsObject.savings.remaining > 0 ? 'remaining' : 'overspent'}
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: spendsObject.savings.percentage > 0 ? 'white' : 'red',
              }}>
              {spendsObject.savings.remaining > 0
                ? `${Math.floor(spendsObject.savings.percentage)}% remaining`
                : `${Math.abs(
                    Math.floor(spendsObject.savings.percentage),
                  )}% overspent`}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'relative',
            bottom: 0,
            height: 0.1 * windowHeight,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Button onPress={() => navigation.push('Settings')}>Settings</Button>
          <Button
            onPress={() =>
              navigation.push('AddSpend', {
                currentUser: accountifyUser,
              })
            }>
            Add Spend
          </Button>
          <Button onPress={() => navigation.push('History')}>History</Button>
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
