/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, NativeModules, Platform } from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {getDimensions} from '../../util/getDimensions';

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
    if (amount) handleInputChange(amount);
  }, []);

  const handleInputChange = (text: string) => {
    // Remove all non-numeric characters except for the decimal point
    const cleanedValue = text.replace(/[^0-9.]/g, '');

    // Convert to float and format as currency
    const formattedValue = cleanedValue
      ? new Intl.NumberFormat(locale.replace('_', '-')).format(parseFloat(cleanedValue))
      : '';

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
        value={fieldAmount}
        style={{
          fontSize: 20,
        }}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

export default MoneyAmountField;
