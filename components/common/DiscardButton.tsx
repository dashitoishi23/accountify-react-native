/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, GestureResponderEvent} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

const DiscardButton: React.FC<{
  onPressCallback: (e: GestureResponderEvent) => void;
}> = ({onPressCallback}) => {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;

  return (
    <Button
      style={{
        backgroundColor: theme.colors.onBackground,
        width: 0.3 * windowWidth,
      }}
      onPress={onPressCallback}
      labelStyle={{
        color: theme.colors.background,
        fontSize: 20,
      }}
      mode="outlined">
      Discard
    </Button>
  );
};

export default DiscardButton;
