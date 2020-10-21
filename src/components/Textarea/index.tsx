import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { Feather } from '@expo/vector-icons'
import Input from '../Input'
import { Container, TextareaComponent, ButtonText, ToggleTextarea, SendButton, Warning, TextLenghtCounter } from './styles';

interface TextAreaProps {
  handleSendPiu(text:string):void;
}


const Textarea: React.FC<TextAreaProps> = ({handleSendPiu}) => {
  const [isToggled, setIsToggled] = useState(false);
  const [inputedText, setInputedText] = useState('');
  const [isPiuValid, setIsPiuValid] = useState(true);
  const [warning, setWarning] = useState('');

  const handleToggle = useCallback(()=>{
    setIsToggled(!isToggled);
  },[setIsToggled,isToggled]);

  const handleTrySendPiu = useCallback((text:string)=>{
    if(!text){
      setWarning('O campo não pode estar vazio')
      setIsPiuValid(false);
    }else{
      setInputedText('');
      handleSendPiu(text);
    }
  },[setWarning, handleSendPiu, setIsPiuValid]);

  const handleTextFilter = useCallback((text:string)=>{
    setInputedText(text);
    if(isPiuValid && text.length>140){
      setIsPiuValid(false);
      setWarning('Ultrapassou limite de caracteres (140)');
    }
    if(text.length != 0 && text.length<=140){
      setWarning('');
      setIsPiuValid(true);
    }
  },[isPiuValid, setIsPiuValid, setInputedText,inputedText]);
  

  return (
    <>
      <ToggleTextarea onPress={handleToggle}>
        {isToggled?
         <Feather name={'message-circle'} color={'yellow'} size={24}/>
        :<Feather name={'message-circle'} color={'black'} size={24}/>
        }
        <ButtonText>Escrever</ButtonText>
      </ToggleTextarea>
      {isToggled && (
        <Container>
        <TextLenghtCounter isStyledPiuValid={isPiuValid} >
          {inputedText.length}/140
        </TextLenghtCounter>
        <TextareaComponent
        isStyledPiuValid={isPiuValid} 
        value={inputedText}
        placeholder={'O que você está ciscando hoje?'}
        onChangeText={(text:string) => handleTextFilter(text)}
        multiline={true}
        numberOfLines={4}
        ></TextareaComponent>
        <Warning>{warning}</Warning>
        <SendButton onPress={() =>{handleTrySendPiu(inputedText)}} isStyledPiuValid={isPiuValid} enabled={isPiuValid}>
          <Feather name={'send'} color={'white'} size={24}></Feather>
        </SendButton>
        </Container>
        
        
      )} 
    </>
);
}

export default Textarea;
