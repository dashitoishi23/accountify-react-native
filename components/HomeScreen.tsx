import React from 'react';
import {View} from 'react-native';
import AffirmationButton from './common/AffirmationButton';
import DiscardButton from './common/DiscardButton';
import MoneyAmountField from './common/MoneyAmountField';

const HomeScreen = () => {
  return (
    <View>
      <AffirmationButton onPressCallback={() => console.log('Pressed')} />
      <DiscardButton onPressCallback={() => console.log('Discard pressed')} />
      <MoneyAmountField amount={Math.abs(450000).toFixed(2)} />
    </View>
  );
};

export default HomeScreen;
