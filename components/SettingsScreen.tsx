/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import MoneyAmountField from './common/MoneyAmountField';
import {AccountifyUser} from '../util/db/models/accountifyUser';
import AffirmationButton from './common/AffirmationButton';
import TextBox from './common/TextBox';
import {getDimensions} from '../util/getDimensions';
import {ToastAndroid, View} from 'react-native';
import DropdownField from './common/DropdownField';
import {CurrencyList} from '../util/currencylist';
import {addUser, updateUser} from '../util/db/repository';
import {Text, useTheme} from 'react-native-paper';
import {dbOps} from '../util/db';
import {getAccountifyUser} from '../util/db/init';

const SettingsScreen: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  const [settings, setSettings] = useState<AccountifyUser>({
    monthlyIncome: 0,
    needsAllocation: 50,
    wantsAllocation: 30,
    savingsAllocation: 20,
    defaultCurrency: 'INR',
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [newUser, setNewUser] = useState<boolean>(true);

  useEffect(() => {
    getSettings().then(fetchedSettings => {
      if (fetchedSettings.length > 0) {
        const fetched = fetchedSettings.item(0);
        console.log('fetchedSettings DB read', fetched);
        setSettings({
          ...settings,
          ...fetched,
        });
        setNewUser(false);
      }
      setIsLoading(false);
    });
  }, []);

  const getSettings = async () => {
    await dbOps.initiateDBConnection();
    const dbConnection = dbOps.getDatabaseConnection();
    const user = await getAccountifyUser(dbConnection);
    return user;
  };

  const theme = useTheme();

  const settingsValidator = () => {
    console.log(settings);
    const totalPercentage =
      settings.needsAllocation +
      settings.wantsAllocation +
      settings.savingsAllocation;
    if (totalPercentage !== 100)
      return {
        error: true,
        message: 'Percentages should add up to 100',
      };

    if (
      settings.needsAllocation > 100 ||
      settings.wantsAllocation > 100 ||
      settings.savingsAllocation > 100
    )
      return {
        error: true,
        message: 'No percentage can be more than 100',
      };

    if (settings.monthlyIncome === 0)
      return {
        error: true,
        message: 'Monthly income must be non zero',
      };

    return {
      error: false,
      message: 'NA',
    };
  };

  const upsertSettings = async () => {
    try {
      const {error, message} = settingsValidator();
      if (!error) {
        if (newUser) {
          await addUser(settings);
        } else {
          await updateUser(settings);
        }
        navigation.push('Home', {currentUser: settings});
      } else {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const {windowHeight} = getDimensions();
  return !isLoading ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: theme.colors.background,
      }}>
      <MoneyAmountField
        amount={settings.monthlyIncome.toString()}
        setAmount={(newAmount: string) =>
          setSettings({
            ...settings,
            monthlyIncome: parseFloat(newAmount.split(',').join('')) as number,
          })
        }
        label="Your monthly earnings"
      />
      <TextBox
        label="Needs Allocation"
        type="number"
        placeholder="Enter percentage"
        setText={(needsAllocation: string) => {
          setSettings({
            ...settings,
            needsAllocation: parseFloat(needsAllocation),
          });
        }}
        text={settings.needsAllocation.toString()}
        bottomText="Needs suggests spends that are towards the necessities of life. Suggested: 50%"
        marginBottom={0.05 * windowHeight}
      />
      <TextBox
        label="Wants Allocation"
        type="number"
        placeholder="Enter percentage"
        setText={(wantsAllocation: string) => {
          setSettings({
            ...settings,
            wantsAllocation: parseFloat(wantsAllocation),
          });
        }}
        text={settings.wantsAllocation.toString()}
        bottomText="Wants suggests spends that are targetted towards lifestyle, indulegment etc. Ex. subscriptions. Suggested: 30%"
        marginBottom={0.05 * windowHeight}
      />
      <TextBox
        label="Savings Allocation"
        type="number"
        placeholder="Enter percentage"
        setText={(savingsAllocation: string) => {
          setSettings({
            ...settings,
            savingsAllocation: parseFloat(savingsAllocation),
          });
        }}
        text={settings.savingsAllocation.toString()}
        bottomText="Savings suggests spends that are made towards your future and/or current savings. Ex. investments. Suggested: 20%"
        marginBottom={0.05 * windowHeight}
      />
      <DropdownField
        items={CurrencyList}
        setItem={(newValue: any) =>
          setSettings({
            ...settings,
            defaultCurrency: newValue,
          })
        }
        placeholderText="Select default currency"
        marginBottom={0.05 * windowHeight}
        labelText="Default currency"
        value={settings.defaultCurrency}
      />
      <AffirmationButton
        text="Save settings"
        onPressCallback={async () => await upsertSettings()}
      />
    </View>
  ) : (
    <Text>Loading</Text>
  );
};

export default SettingsScreen;
