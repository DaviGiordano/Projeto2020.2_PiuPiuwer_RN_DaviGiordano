import React, { useCallback, useEffect, useState } from 'react';

import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import LoginBackground from '../../assets/images/dive.jpg';
import logoBig from '../../assets/images/icons/logo-big.png';

import Button from '../../components/Button';
import Input from '../../components/Input';


import { Container, Background } from './styles';

const Login: React.FC = () => {

    const { navigate } = useNavigation();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = useCallback(() => {
        console.log({username,password});

        navigate('Feed');
    }, [navigate, username, password]);

    return (
    <Container>
        <Background
            blurRadius={1} 
            source={LoginBackground}
        >
            <Image source={logoBig}></Image>
            <Input value={username} onChangeText={(text:string) => setUsername(text)} placeholderText={'Usuário'}/>
            <Input value={password} onChangeText={(text:string) => setPassword(text)} placeholderText={'Senha'}/>
            <Button onPress={handleLogin}></Button>   
        </Background>
    </Container>
    );
}




export default Login;