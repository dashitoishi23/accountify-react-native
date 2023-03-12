/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, GestureResponderEvent} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

const AffirmationButton: React.FC<{
  onPressCallback: (e: GestureResponderEvent) => void;
}> = ({onPressCallback}) => {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;

  return (
    <Button
      style={{
        backgroundColor: theme.colors.primaryContainer,
        width: 0.3 * windowWidth,
      }}
      onPress={onPressCallback}
      labelStyle={{
        color: theme.colors.onBackground,
        fontSize: 20,
      }}
      mode="contained">
      Save
    </Button>
  );
};

export default AffirmationButton;
