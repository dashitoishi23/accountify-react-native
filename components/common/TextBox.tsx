import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

const TextBox: React.FC<{
  label: string;
  text?: string;
  placeholder: string;
  setText: Function;
}> = ({label, placeholder, setText, text}) => {
  const [content, setContent] = useState(text ? text : '');
  return (
    <TextInput
      label={label}
      value={content}
      placeholder={placeholder}
      onChangeText={newText => {
        setContent(newText);
        setText(newText);
      }}
    />
  );
};

export default TextBox;
