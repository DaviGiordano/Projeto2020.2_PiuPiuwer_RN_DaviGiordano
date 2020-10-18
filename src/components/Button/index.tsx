import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';

import { ButtonContainer, ButtonText} from './styles';


const Button: React.FC<TouchableOpacityProps> = ({...rest}) => {
    return (
    <ButtonContainer {...rest}>
        <ButtonText>
            Entrar
        </ButtonText>
    </ButtonContainer>);
}

export default Button;