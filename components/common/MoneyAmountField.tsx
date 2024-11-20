/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {getDimensions} from '../../util/getDimensions';

const MoneyAmountField: React.FC<{
  amount: string | undefined;
  setAmount: Function;
  label: string;
}> = ({amount, setAmount, label}) => {
  const {windowWidth} = getDimensions();
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
        value={amount}
        placeholder="0"
        style={{
          fontSize: 20,
        }}
        onChangeText={e => setAmount(e)}
      />
    </View>
  );
};

export default MoneyAmountField;
