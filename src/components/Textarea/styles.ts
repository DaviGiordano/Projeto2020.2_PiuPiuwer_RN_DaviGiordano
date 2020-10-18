import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    width:100%;
    height:200px;
    margin-top:10px;
    margin-bottom:10px;
`;

export const TextareaComponent = styled.TextInput`
    width:100%;
    height:50px;
    padding:10px;
    background-color:#fff;
    border-width:1px;
    border-color:#003f88;
    border-radius:5px;
`;

export const Button = styled(RectButton)`
    margin-top:10px;
    width:100px;
    height:30px;
    background-color:#04d361;
`;