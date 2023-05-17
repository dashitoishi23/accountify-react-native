/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import MoneyAmountField from './common/MoneyAmountField';
import {AccountifyUser} from '../util/db/models/accountifyUser';
import AffirmationButton from './common/AffirmationButton';
import TextBox from './common/TextBox';
import {getDimensions} from '../util/getDimensions';
import {View} from 'react-native';

const SettingsScreen = () => {
  const [settings, setSettings] = useState<AccountifyUser>({
    monthlyIncome: 0,
    needsAllocation: 50,
    wantsAllocation: 30,
    savingsAllocation: 20,
    defaultCurrency: 'INR',
  });

  const {windowHeight} = getDimensions();
  return (
    <View
      style={{
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}>
      <MoneyAmountField
        amount="0"
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
        bottomText="Needs suggests spends that are towards the necessities of life. Suggested: 50%"
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
        bottomText="Wants suggests spends that are targetted towards lifestyle, indulegment etc. Ex. subscriptions. Suggested: 30%"
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
        bottomText="Savings suggests spends that are made towards your future and/or current savings. Ex. investments. Suggested: 20%"
        marginBottom={0.05 * windowHeight}
      />
      <AffirmationButton
        text="Save settings"
        onPressCallback={() => console.log(settings)}
      />
    </View>
  );
};

export default SettingsScreen;
