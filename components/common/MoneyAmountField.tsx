/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import currencyMasker from '../../util/currencyMasker';
import {getDimensions} from '../../util/getDimensions';

const MoneyAmountField: React.FC<{
  amount: string | undefined;
  setAmount: Function;
  label: string;
}> = ({amount, setAmount, label}) => {
  const [fieldAmount, setFieldAmount] = useState('0');
  const {windowWidth} = getDimensions();

  useEffect(() => {
    if (amount) setFieldAmount(amount);
  }, []);
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
        value={currencyMasker(fieldAmount)}
        style={{
          fontSize: 20,
        }}
        onChangeText={newAmount => {
          console.log(newAmount, 'enterted');
          setFieldAmount(newAmount ? currencyMasker(newAmount) : '0');
          setAmount(currencyMasker(newAmount));
        }}
      />
    </View>
  );
};

export default MoneyAmountField;
