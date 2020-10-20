import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { ButtonContainer, ButtonText} from './styles';

interface ButtonProps extends TouchableOpacityProps{
    isLoading:boolean;
}

const Button: React.FC<ButtonProps> = ({isLoading, children, ...rest}) => {
    return (
    <ButtonContainer  {...rest}>
        {isLoading?
        <Feather name={'loader'} size={24}></Feather>
        : <ButtonText>Entrar</ButtonText>    
    }
    </ButtonContainer>);
}

export default Button;