/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';
import {getDimensions} from '../../util/getDimensions';

const DropdownField: React.FC<{
  items: ItemType<string>[];
  setItem: Function;
  placeholderText: string;
  labelText: string;
  marginBottom?: number;
}> = ({items, setItem, marginBottom, placeholderText, labelText}) => {
  const [currentValue, setCurrentValue] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const {windowHeight} = getDimensions();
  return (
    <View
      style={{
        marginBottom: !marginBottom ? 0 : marginBottom,
      }}>
      <Text
        style={{
          marginBottom: 0.005 * windowHeight,
        }}>
        {labelText}
      </Text>
      <DropDownPicker
        placeholder={placeholderText}
        items={items}
        value={currentValue}
        setValue={newValue => {
          setCurrentValue(newValue);
        }}
        onChangeValue={newValue => {
          setItem(newValue);
        }}
        setOpen={setOpen}
        open={open}
      />
    </View>
  );
};

export default DropdownField;
