/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

const TextBox: React.FC<{
  label: string;
  text?: string;
  placeholder: string;
  setText: Function;
  type: 'number' | 'string';
  bottomText?: string;
  marginBottom?: number;
}> = ({label, placeholder, setText, type, text, bottomText, marginBottom}) => {
  const [content, setContent] = useState(text ? text : '');
  return (
    <View
      style={{
        marginBottom: !marginBottom ? 0 : marginBottom,
      }}>
      <TextInput
        label={label}
        value={content}
        placeholder={placeholder}
        keyboardType={type === 'number' ? 'decimal-pad' : 'default'}
        onChangeText={newText => {
          setContent(newText);
          setText(newText);
        }}
      />
      {bottomText ? <Text>{bottomText}</Text> : null}
    </View>
  );
};

export default TextBox;
