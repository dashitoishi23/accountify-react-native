import React, {useState} from 'react';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';

const DropdownField: React.FC<{
  items: ItemType<string>[];
  setItem: Function;
}> = ({items, setItem}) => {
  const [currentValue, setCurrentValue] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DropDownPicker
      items={items}
      value={currentValue}
      setValue={newValue => {
        setCurrentValue(newValue);
        setItem(newValue);
      }}
      setOpen={setOpen}
      open={open}
    />
  );
};

export default DropdownField;
