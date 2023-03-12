/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

const AffirmationButton = () => {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;

  return (
    <Button
      style={{
        backgroundColor: theme.colors.primaryContainer,
        width: 0.3 * windowWidth,
      }}
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
