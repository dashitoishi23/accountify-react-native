/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, GestureResponderEvent} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

const AffirmationButton: React.FC<{
  onPressCallback: (e: GestureResponderEvent) => void;
  text: string;
}> = ({onPressCallback, text}) => {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;

  return (
    <Button
      style={{
        backgroundColor: theme.colors.primaryContainer,
        margin: 0.03 * windowWidth,
      }}
      onPress={onPressCallback}
      labelStyle={{
        color: theme.colors.onBackground,
        fontSize: 20,
      }}
      mode="contained">
      {text}
    </Button>
  );
};

export default AffirmationButton;
