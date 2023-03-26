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
      <MoneyAmountField amount={450000} />
    </View>
  );
};

export default HomeScreen;
