import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { InputContainer } from './styles';

interface inputProps extends TextInputProps{
    placeholderText:string,
}

const Input: React.FC<inputProps> = ({placeholderText,...rest}) => {
    return <InputContainer {...rest} autoCapitalize={'none'} autoCorrect={false} placeholder={placeholderText} ></InputContainer>;
}

export default Input;