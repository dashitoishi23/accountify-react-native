/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';
import {getDimensions} from '../../util/getDimensions';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownField: React.FC<{
  items: ItemType<string>[];
  setItem: Function;
  placeholderText: string;
  labelText: string;
  value: string;
  marginBottom?: number;
}> = ({items, setItem, marginBottom, placeholderText, labelText, value}) => {
  const [currentValue, setCurrentValue] = useState<any>(value);
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
      {/* <DropDownPicker
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
      /> */}
      <Dropdown
        data={items}
        valueField={'value'}
        labelField={'label'}
        value={currentValue}
        onChange={newValue => {
          setItem(newValue.value);
        }}
        itemTextStyle={{
          color: 'black',
        }}
        selectedTextStyle={{
          color: 'white',
        }}
        inputSearchStyle={{
          color: 'black',
        }}
        search
        placeholder={placeholderText}
        searchPlaceholder="Search"
      />
    </View>
  );
};

export default DropdownField;
