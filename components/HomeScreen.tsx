import React from 'react';
import {View} from 'react-native';
import AffirmationButton from './common/AffirmationButton';
import DiscardButton from './common/DiscardButton';

const HomeScreen = () => {
  return (
    <View>
      <AffirmationButton onPressCallback={() => console.log('Pressed')} />
      <DiscardButton onPressCallback={() => console.log('Discard pressed')} />
    </View>
  );
};

export default HomeScreen;
