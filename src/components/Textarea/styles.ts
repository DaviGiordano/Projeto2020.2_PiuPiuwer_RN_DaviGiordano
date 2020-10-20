import { RectButton } from 'react-native-gesture-handler';
import styled, {css} from 'styled-components/native';

interface FormProps {
    isStyledPiuValid:boolean
}

export const Container = styled.View`
    width:100%;
    height:150px;
    margin-top:10px;
`;

export const TextareaComponent = styled.TextInput<FormProps>`
    width:100%;
    flex:2;
    padding:10px;
    background-color:#fff;
    border-width:1px;
    border-color: ${props => (props.isStyledPiuValid ? 'black' : 'red')};
    border-radius:5px;
`;

export const SendButton = styled(RectButton)<FormProps>`
    margin-top:10px;
    width:70px;
    height:40px;
    border-radius:10px;
    background-color:#04d361;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    margin-bottom:10px;
    margin-right:10px;
    align-self:flex-end;
    opacity:1;
    ${props =>
	    !props.isStyledPiuValid &&
	    css`
	      opacity:0.5;
	    `};
`;

export const ButtonText = styled.Text`
    font-family:Quicksand_600SemiBold;
    color:#003F88;
    text-align:center;
    font-size:16px;
    margin-left:5px;
`;


export const ToggleTextarea = styled(RectButton)`
    width:150px;
    height:40px;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    margin-top:10px;
    margin-bottom:5px;
   
`;

export const Warning = styled.Text`
    width:100%;
    font-family:Quicksand_400Regular;
    color:#e33d3d;
    font-size:14px;
`;