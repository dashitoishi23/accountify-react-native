import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import AffirmationButton from './common/AffirmationButton';
import DatePickerField from './common/DatePickerField';
import DiscardButton from './common/DiscardButton';
import MoneyAmountField from './common/MoneyAmountField';
import TextBox from './common/TextBox';

const HomeScreen = () => {
  const [amount, setAmount] = useState('0');
  const [text, setText] = useState('0');
  const [date, setDate] = useState(new Date());
  const onConfirmHandler = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <View>
      <AffirmationButton onPressCallback={() => console.log('Pressed')} />
      <DiscardButton onPressCallback={() => console.log('Discard pressed')} />
      <MoneyAmountField
        amount={Math.abs(450000).toFixed(2)}
        setAmount={setAmount}
      />
      <Text>{amount}</Text>
      <TextBox label="Reason" placeholder="Enter reason" setText={setText} />
      <Text>{text}</Text>
      <DatePickerField onConfirmHandler={onConfirmHandler} />
      <Text>{date.toLocaleDateString()}</Text>
    </View>
  );
};

export default HomeScreen;
