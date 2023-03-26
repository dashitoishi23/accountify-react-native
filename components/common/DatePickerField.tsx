/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';

const DatePickerField: React.FC<{date?: Date; onConfirmHandler: Function}> = ({
  date,
  onConfirmHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldDate, setFieldDate] = useState(date ? date : new Date());
  return (
    <View>
      <Button
        onPress={() => setIsOpen(true)}
        style={{
          borderWidth: 2,
          borderColor: '#000',
          borderRadius: 0,
        }}
        labelStyle={{
          fontSize: 20,
        }}>
        {fieldDate.toLocaleDateString([], {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Button>
      <DatePicker
        modal
        open={isOpen}
        date={fieldDate}
        onConfirm={newDate => {
          setFieldDate(newDate);
          onConfirmHandler(newDate);
          setIsOpen(false);
        }}
      />
    </View>
  );
};

export default DatePickerField;
