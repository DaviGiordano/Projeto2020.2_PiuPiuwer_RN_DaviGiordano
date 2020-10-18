import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Feather } from '@expo/vector-icons'

import { HeaderContainer, Icon, Title } from './styles';
import { ActionButton } from '../Piu/styles';

import Logo from '../../assets/images/icons/logo.png'


const Header: React.FC = () => {

    const handleLogOut = useCallback(()=>{
        alert('logged Out!');
        //logOut();
    },[]);
        
   

    return (
        <HeaderContainer>
            <Icon resizeMode='contain' source={Logo}></Icon>
            <Title>PiuPiuwer</Title>
            
            <ActionButton onPress={handleLogOut}>
                <Feather name={'log-out'} size={24}/>
            </ActionButton>
        </HeaderContainer>
    );
}

export default Header;