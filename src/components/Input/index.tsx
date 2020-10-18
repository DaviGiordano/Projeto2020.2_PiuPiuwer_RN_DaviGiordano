import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { InputContainer } from './styles';

interface inputProps extends TextInputProps{
    placeholderText:string,
}

const Input: React.FC<inputProps> = ({placeholderText,...rest}) => {
    return <InputContainer {...rest} placeholder={placeholderText} ></InputContainer>;
}

export default Input;