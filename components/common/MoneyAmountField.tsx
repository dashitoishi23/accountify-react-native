/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, NativeModules, Platform} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {getDimensions} from '../../util/getDimensions';
import {handleInputChange} from '../../util/currencyInputHandler';

const MoneyAmountField: React.FC<{
  amount: string | undefined;
  setAmount: Function;
  label: string;
}> = ({amount, setAmount, label}) => {
  const [fieldAmount, setFieldAmount] = useState('');
  const {windowWidth} = getDimensions();

  const locale: string =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;

  useEffect(() => {
    if (amount) {
      handleInputChange(amount);
      handleMoneyInputChange(amount);
    }
  }, []);

  const handleMoneyInputChange = (text: string) => {
    const formattedValue = handleInputChange(text);
    setFieldAmount(formattedValue);
    setAmount(formattedValue);
  };
  return (
    <View
      style={{
        marginBottom: 0.05 * windowWidth,
      }}>
      <Text style={{fontSize: 15}}>{label}</Text>
      <TextInput
        label="Amount"
        mode="outlined"
        keyboardType="decimal-pad"
        value={fieldAmount === '0' ? '' : fieldAmount}
        placeholder="0"
        style={{
          fontSize: 20,
        }}
        onChangeText={setFieldAmount}
        onBlur={() => handleMoneyInputChange(fieldAmount)}
      />
    </View>
  );
};

export default MoneyAmountField;
