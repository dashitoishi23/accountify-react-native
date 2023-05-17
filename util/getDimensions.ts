import {Dimensions} from 'react-native';

export const getDimensions = () => {
  return {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
  };
};
