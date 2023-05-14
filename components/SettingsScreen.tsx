import React, {useState} from 'react';
import {View} from 'react-native';
import MoneyAmountField from './common/MoneyAmountField';
import {AccountifyUser} from '../util/db/models/accountifyUser';

const SettingsScreen = () => {
  const [settings, setSettings] = useState<AccountifyUser>({
    monthlyIncome: 0,
    needsAllocation: 50,
    wantsAllocation: 30,
    savingsAllocation: 20,
    defaultCurrency: 'INR',
  });
  return (
    <View>
      <MoneyAmountField
        amount="0"
        setAmount={(newAmount: string) =>
          setSettings({
            ...settings,
            monthlyIncome: parseInt(newAmount, 10) as number,
          })
        }
      />
    </View>
  );
};

export default SettingsScreen;
