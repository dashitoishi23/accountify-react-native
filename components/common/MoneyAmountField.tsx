/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

const MoneyAmountField: React.FC<{amount: number | undefined}> = ({amount}) => {
  const [fieldAmount, setFieldAmount] = useState(amount ?? 0);
  return (
    <View>
      <TextInput
        label="Amount"
        mode="outlined"
        keyboardType="decimal-pad"
        value={fieldAmount.toString()}
        style={{
          fontSize: 20,
        }}
        right={
          <TextInput.Icon
            icon="calculator"
            onPress={() => console.log('Calc')}
          />
        }
        onChangeText={newAmount =>
          setFieldAmount(newAmount ? parseInt(newAmount, 10) : 0)
        }
      />
    </View>
  );
};

export default MoneyAmountField;
