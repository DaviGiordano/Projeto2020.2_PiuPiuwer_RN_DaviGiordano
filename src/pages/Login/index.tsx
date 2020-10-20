import React, { useCallback, useEffect, useState } from 'react';

import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import LoginBackground from '../../assets/images/dive.jpg';
import logoBig from '../../assets/images/icons/logo-big.png';

import Button from '../../components/Button';
import Input from '../../components/Input';


import { Container, Background } from './styles';
import { useAuth } from '../../contexts/auth';
import { Warning } from '../../components/Textarea/styles';

const Login: React.FC = () => {

    const {signIn, token, user} = useAuth();

    const { navigate } = useNavigation();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [logInWarning, setLoginWarning] = useState<string>('');
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

    const handleSignIn = useCallback(async (usernameInput, passwordInput) => {
        if(!username || !password){
            alert('Preencha todos os campos!');
        }else{
            setIsButtonLoading(true);
            const response = await signIn(usernameInput, passwordInput);
            if(response == 'usuário ou senha incorreto'){
                alert('Usuário ou senha incorreto');
                setIsButtonLoading(false);
            }            
        }
    }, [navigate, username, password, signIn, user, token]);

    return (
    <Container>
        <Background
            blurRadius={1} 
            source={LoginBackground}
        >
            <Image source={logoBig}></Image>
            <Input value={username} onChangeText={(text:string) => setUsername(text)} placeholderText={'Usuário'}/>
            <Input value={password} onChangeText={(text:string) => setPassword(text)} placeholderText={'Senha'}/>
            <Button isLoading={isButtonLoading}  onPress={() => handleSignIn(username,password)}></Button>   
            <Warning>{logInWarning}</Warning>
        </Background>
    </Container>
    );
}




export default Login;