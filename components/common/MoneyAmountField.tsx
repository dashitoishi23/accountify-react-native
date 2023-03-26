/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import currencyMasker from '../../util/currencyMasker';

const MoneyAmountField: React.FC<{
  amount: string | undefined;
  setAmount: Function;
  onCalcPressedHandler: Function;
}> = ({amount, setAmount, onCalcPressedHandler}) => {
  const [fieldAmount, setFieldAmount] = useState(amount ? amount : '0');
  return (
    <View>
      <TextInput
        label="Amount"
        mode="outlined"
        keyboardType="decimal-pad"
        value={currencyMasker(fieldAmount)}
        style={{
          fontSize: 20,
        }}
        right={
          <TextInput.Icon
            icon="calculator"
            onPress={() => onCalcPressedHandler}
          />
        }
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
