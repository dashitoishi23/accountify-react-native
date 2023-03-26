/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import AffirmationButton from './common/AffirmationButton';
import DiscardButton from './common/DiscardButton';
import MoneyAmountField from './common/MoneyAmountField';
import TextBox from './common/TextBox';

const onCalcPressedHandler = () => {};

const HomeScreen = () => {
  const [amount, setAmount] = useState('0');
  const [text, setText] = useState('0');
  return (
    <View>
      <AffirmationButton onPressCallback={() => console.log('Pressed')} />
      <DiscardButton onPressCallback={() => console.log('Discard pressed')} />
      <MoneyAmountField
        amount={Math.abs(450000).toFixed(2)}
        setAmount={setAmount}
        onCalcPressedHandler={onCalcPressedHandler}
      />
      <Text>{amount}</Text>
      <TextBox label="Reason" placeholder="Enter reason" setText={setText} />
      <Text>{text}</Text>
    </View>
  );
};

export default HomeScreen;
