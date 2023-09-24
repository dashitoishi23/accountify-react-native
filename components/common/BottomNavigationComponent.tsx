import {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {dbOps} from '../../util/db';
import {getAccountifyUser} from '../../util/db/init';
import {AccountifyUser} from '../../util/db/models/accountifyUser';
import SettingsScreen from '../SettingsScreen';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomNavigationComponent = () => {
  const [index, setIndex] = useState<number>(0);
  const [userSettings, setUserSettings] = useState<AccountifyUser>();
  const [routes] = useState([
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'cog',
      sunfocusedIcon: 'cog-outlines',
    },
    {
      key: 'add-expene',
      title: 'Add Expense',
      focusedIcon: 'account-cash',
      sunfocusedIcon: 'account-cash-online',
    },
    {
      key: 'history',
      title: 'Spend History',
      focusedIcon: 'account-clock',
      sunfocusedIcon: 'account-clock-outlines',
    },
  ]);

  const Tab = createBottomTabNavigator();

  const handleIndexChange = async (index: number) => {
    if (index === 0) {
      setUserSettings(await getSettings());
    }
    setIndex(index);
  };

  const getSettings = async () => {
    await dbOps.initiateDBConnection();
    const dbConnection = dbOps.getDatabaseConnection();
    const user = await getAccountifyUser(dbConnection);
    return user.item(0);
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
